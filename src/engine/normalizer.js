export const normalizeAIResponse = (raw) => {
  const blocks = Array.isArray(raw?.content) ? raw.content : []
  const text = blocks
    .filter((block) => block && block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("")
    .trim()
    
  const truncated = raw?.stop_reason === "max_tokens"
  return { text, truncated }
}