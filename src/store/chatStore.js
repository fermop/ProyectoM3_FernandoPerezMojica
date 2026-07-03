export const chatHistory = {
  naruto: [],
  kakashi: [],
  'rock-lee': []
}

export const addMessage = (character, text, sender) => {
  if (!chatHistory[character]) {
    chatHistory[character] = []
  }
  chatHistory[character].push({ text, sender })
}

export const getMessages = (character) => {
  return chatHistory[character] || []
}

const state = {
  status: "idle", // 'idle' | 'loading' | 'error'
  data: null,
  error: null
}

export const getState = () => {
  return { ...state }
}

export const setState = (updates) => {
  Object.assign(state, updates)
}