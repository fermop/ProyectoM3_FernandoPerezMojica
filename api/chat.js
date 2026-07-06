import { GoogleGenerativeAI } from '@google/generative-ai'

const toGeminiContents = (messages) => {
  return messages
    .filter((msg) => msg?.role === "user" || msg?.role === "assistant")
    .map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: String(msg.content ?? "") }]
    }))
}

const createChatResponse = (text) => {
  return {
    id: `msg_gemini_${Date.now()}`,
    type: "message",
    role: "assistant",
    content: [{ type: "text", text }],
    stop_reason: "end_turn"
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const payload = req.body ?? {}
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) return res.status(500).json({ error: 'API Key is missing' })

    const messages = Array.isArray(payload?.messages) ? payload.messages : []
    const system = typeof payload?.system === "string" ? payload.system : ""
    const modelName = typeof payload?.model === "string" ? payload.model : "gemini-2.5-flash"
    const temperature = typeof payload?.temperature === "number" ? payload.temperature : 0.7
    const maxOutputTokens = typeof payload?.max_tokens === "number" ? payload.max_tokens : 150

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: system
    })

    const contents = toGeminiContents(messages)

    const result = await model.generateContent({
      contents,
      generationConfig: { temperature, maxOutputTokens }
    })

    const text = result.response.text().trim()
    return res.status(200).json(createChatResponse(text))
    
  } catch (error) {
    console.error('Gemini API Error:', error)
    return res.status(500).json({ error: 'Internal server error while fetching AI response' })
  }
}