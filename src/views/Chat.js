import { getMessages, addMessage } from '#/store/chatStore.js'

const characterNames = {
  naruto: 'Naruto Uzumaki',
  kakashi: 'Kakashi Hatake',
  'rock-lee': 'Rock Lee'
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
        
        <div class="chat-messages" id="chat-messages">
          </div>
        
        <form id="chat-form" class="chat-input-area">
          <input type="text" id="message-input" placeholder="Escribe un mensaje..." autocomplete="off" required />
          <button type="submit" class="btn-primary">Enviar</button>
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
  const contactImgs = document.querySelectorAll('.contact-img')

  if (chatNameEl) {
    chatNameEl.textContent = characterNames[currentChar] || 'Shinobi'
  }

  contactImgs.forEach(img => {
    img.classList.remove('active')
    if (img.dataset.char === currentChar) {
      img.classList.add('active')
    }
    
    img.addEventListener('click', () => {
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
    
    if (messages.length === 0) {
      messagesContainer.innerHTML = `
        <div class="message system-msg">
          <p>Inicia tu entrenamiento conversacional con ${characterNames[currentChar]}.</p>
        </div>
      `
      return
    }

    messagesContainer.innerHTML = messages.map(msg => `
      <div class="message ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}">
        <p>${msg.text}</p>
      </div>
    `).join('')

    scrollToBottom()
  }

  renderMessages()

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = messageInput.value.trim()
      if (!text) return

      addMessage(currentChar, text, 'user')
      messageInput.value = ''
      renderMessages()

      setTimeout(() => {
        addMessage(currentChar, `(Mock) Entendido, shinobi. Recibí: "${text}"`, 'ai')
        renderMessages()
      }, 1000)
    })
  }
}