import { getMessages, addMessage, getState, setState } from '#/store/chatStore.js'
import { charactersConfig } from '#/config/prompts.js'
import { getTrimmedHistory } from '#/engine/history.js'
import { buildPayload, isValidPayload } from '#/engine/payload.js'
// import { callAI } from '#/engine/aiClient.js'
import { callAI } from '#/engine/mockApi.js'
import { normalizeAIResponse } from '#/engine/normalizer.js'

const characterNames = {
  naruto: 'Naruto Uzumaki',
  kakashi: 'Kakashi Hatake',
  'rock-lee': 'Rock Lee'
}

const escapeHtml = (text) => {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export const Chat = () => {
  return `
    <section class="chat-view fade-in">
      <aside class="chat-sidebar">
        <img src="/public/assets/naruto.webp" class="contact-img" alt="Naruto" data-char="naruto" title="Naruto" />
        <img src="/public/assets/kakashi.webp" class="contact-img" alt="Kakashi" data-char="kakashi" title="Kakashi" />
        <img src="/public/assets/rock-lee.webp" class="contact-img" alt="Rock Lee" data-char="rock-lee" title="Rock Lee" />
      </aside>
      
      <div class="chat-main-area">
        <header class="chat-header">
          <h3 id="current-chat-name">Seleccionando...</h3>
        </header>
        
        <div class="chat-messages" id="chat-messages"></div>
        
        <form id="chat-form" class="chat-input-area">
          <input type="text" id="message-input" placeholder="Escribe un mensaje..." autocomplete="off" required />
          <button type="submit" id="submit-btn" class="btn-primary">Enviar</button>
        </form>
      </div>
    </section>
  `
}

export const initChat = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const currentChar = urlParams.get('character') || 'naruto'
  
  const chatNameEl = document.getElementById('current-chat-name')
  const messagesContainer = document.getElementById('chat-messages')
  const chatForm = document.getElementById('chat-form')
  const messageInput = document.getElementById('message-input')
  const submitBtn = document.getElementById('submit-btn')
  const contactImgs = document.querySelectorAll('.contact-img')

  if (chatNameEl) chatNameEl.textContent = characterNames[currentChar] || 'Shinobi'

  contactImgs.forEach(img => {
    img.classList.remove('active')
    if (img.dataset.char === currentChar) img.classList.add('active')
    
    img.addEventListener('click', () => {
      if (getState().status === 'loading') return 
      
      const char = img.dataset.char
      if (char !== currentChar) {
        const a = document.createElement('a')
        a.href = `/chat?character=${char}`
        a.setAttribute('data-link', '')
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
    })
  })

  const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  const renderMessages = () => {
    const messages = getMessages(currentChar)
    const { status } = getState()
    
    if (messages.length === 0 && status !== 'loading') {
      messagesContainer.innerHTML = `
        <div class="message system-msg">
          <p>Inicia tu entrenamiento conversacional con ${characterNames[currentChar]}.</p>
        </div>
      `
      return
    }

    let html = messages.map(msg => {
      const safeText = escapeHtml(msg.content)
      
      if (msg.role === 'system') return `<div class="message system-msg"><p>${safeText}</p></div>`
      return `<div class="message ${msg.role === 'user' ? 'user-msg' : 'ai-msg'}"><p>${safeText}</p></div>`
    }).join('')

    if (status === 'loading') {
      html += `
        <div class="message ai-msg">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      `
    }

    messagesContainer.innerHTML = html
    scrollToBottom()
  }

  renderMessages()

  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      if (getState().status === 'loading') return 

      const text = messageInput.value.trim()
      if (!text) return

      addMessage(currentChar, text, 'user')
      setState({ status: 'loading', error: null })
      
      messageInput.value = ''
      messageInput.disabled = true
      submitBtn.disabled = true
      renderMessages()

      try {
        const trimmedHistory = getTrimmedHistory(getMessages(currentChar), 10)
        const payload = buildPayload(charactersConfig[currentChar], trimmedHistory)

        if (!isValidPayload(payload)) throw new Error("Payload inválido")

        const rawResponse = await callAI(payload)
        const { text: aiText } = normalizeAIResponse(rawResponse)
        
        addMessage(currentChar, aiText, 'assistant')
      } catch (error) {
        console.error(error)
        addMessage(currentChar, 'Lo siento, surgió un problema en la red ninja. Intenta de nuevo.', 'system')
        setState({ error: error.message })
      } finally {
        setState({ status: 'idle' })
        messageInput.disabled = false
        submitBtn.disabled = false
        messageInput.focus()
        renderMessages()
      }
    })
  }
}