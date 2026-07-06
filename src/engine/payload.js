export const buildPayload = (characterConfig, messages) => {
  return {
    model: "gemini-3.1-flash-lite",
    system: characterConfig.system,
    messages,
    max_tokens: characterConfig.max_tokens,
    temperature: characterConfig.temperature
  }
}

export const isValidPayload = (payload) => {
  if (typeof payload?.model !== "string") return false
  if (typeof payload?.system !== "string") return false
  if (!Array.isArray(payload?.messages)) return false
  
  return payload.messages.every((msg) => {
    const hasValidRole = msg?.role === "user" || msg?.role === "assistant"
    const hasTextContent = typeof msg?.content === "string"
    return hasValidRole && hasTextContent
  })
}