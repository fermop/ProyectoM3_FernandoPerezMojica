import { normalizeAIResponse } from '#/engine/normalizer.js'

describe('normalizeAIResponse', () => {
  it('should get text correctly for a valid response', () => {
    const rawMock = {
      content: [{ type: 'text', text: '¡El poder de la juventud!' }],
      stop_reason: 'end_turn'
    }
    
    const result = normalizeAIResponse(rawMock)
    expect(result.text).toBe('¡El poder de la juventud!')
    expect(result.truncated).toBe(false)
  })

  it('should return empty text and avoid breaking if the response has no content', () => {
    expect(normalizeAIResponse(null).text).toBe('')
    expect(normalizeAIResponse({}).text).toBe('')
    expect(normalizeAIResponse({ content: [] }).text).toBe('')
  })

  it('should blocks that are not text (eg. images or tool_use)', () => {
    const rawMock = {
      content: [
        { type: 'image', url: '...' },
        { type: 'text', text: 'Soy un texto seguro' }
      ]
    }
    const result = normalizeAIResponse(rawMock)
    expect(result.text).toBe('Soy un texto seguro')
  })

  it('should mark the response as truncated if token limits exceeded', () => {
    const rawMock = {
      content: [{ type: 'text', text: 'Me quedé a la mit...' }],
      stop_reason: 'max_tokens'
    }
    
    const result = normalizeAIResponse(rawMock)
    expect(result.truncated).toBe(true)
  })
})