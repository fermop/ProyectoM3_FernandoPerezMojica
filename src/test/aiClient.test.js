import { callAI } from '#/engine/aiClient.js'

global.fetch = vi.fn()

describe('aiClient.js', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('should make a POST request to /api/chat sending the JSON payload', async () => {
    const mockPayload = { messages: [{ role: 'user', content: 'hola' }] }
    const mockResponse = { id: '123', content: [{ type: 'text', text: 'respuesta' }] }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await callAI(mockPayload)

    expect(fetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockPayload),
    })

    expect(result).toEqual(mockResponse)
  })

  it('should throw an Error if the server responds with ok: false (e.g., 429 Rate Limit)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Too Many Requests', retryAfterSeconds: 5 }),
    })

    const promise = callAI({ messages: [] })

    await expect(promise).rejects.toThrow('Too Many Requests')

    await promise.catch(err => {
      expect(err.status).toBe(429)
      expect(err.retryAfterSeconds).toBe(5)
    })
  })
})