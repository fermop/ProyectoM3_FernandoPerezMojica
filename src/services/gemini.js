import { systemPrompts } from '#/config/prompts.js'

const formatHistoryForGemini = (history) => {
  return history.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }))
}

export const sendMessageToAI = async (character, message, history) => {
  const prompt = systemPrompts[character]
  const formattedHistory = formatHistoryForGemini(history)

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      history: formattedHistory,
      systemPrompt: prompt
    })
  })

  if (!response.ok) {
    throw new Error('Error en la comunicación con el servidor')
  }

  const data = await response.json()
  return data.reply
}