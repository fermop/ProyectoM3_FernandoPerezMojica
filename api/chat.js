import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, history, systemPrompt } = req.body
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key is missing from environment variables' })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt
    })

    const chat = model.startChat({
      history: history || []
    })

    const result = await chat.sendMessage(message)
    const responseText = result.response.text()

    return res.status(200).json({ reply: responseText })
    
  } catch (error) {
    console.error('Gemini API Error:', error)
    return res.status(500).json({ error: 'Internal server error while fetching AI response' })
  }
}