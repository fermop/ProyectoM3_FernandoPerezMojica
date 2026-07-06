import { appendUserMessage, appendAssistantMessage } from '#/engine/history.js'

export const chatHistory = {
  naruto: [],
  kakashi: [],
  'rock-lee': []
}

export const addMessage = (character, text, role) => {
  if (!chatHistory[character]) chatHistory[character] = []

  if (role === 'user') {
    chatHistory[character] = appendUserMessage(chatHistory[character], text)
  } else if (role === 'assistant') {
    chatHistory[character] = appendAssistantMessage(chatHistory[character], text)
  } else {
    // Local system messages
    chatHistory[character] = [...chatHistory[character], { role, content: text }]
  }
}

export const getMessages = (character) => {
  return chatHistory[character] || []
}

const state = {
  status: "idle",
  data: null,
  error: null
}

export const getState = () => ({ ...state })

export const setState = (updates) => {
  Object.assign(state, updates)
}