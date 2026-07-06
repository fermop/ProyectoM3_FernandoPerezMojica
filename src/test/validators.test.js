import { validateChatInput } from '#/utils/validators.js'

describe('validateChatInput', () => {
  it('should return isValid: true for a normal text in idle state', () => {
    const result = validateChatInput('Hola, Kakashi', 'idle')
    expect(result.isValid).toBe(true)
    expect(result.length).toBe(13)
    expect(result.counterText).toBe('13/100')
  })

  it('should return isValid: false if text is empty', () => {
    const result = validateChatInput('', 'idle')
    expect(result.isValid).toBe(false)
    expect(result.length).toBe(0)
  })

  it('should return isValid: false if text only has blank spaces', () => {
    const result = validateChatInput('      ', 'idle')
    expect(result.isValid).toBe(false)
  })

  it('should return isValid: false if current state is "loading"', () => {
    const result = validateChatInput('Texto válido', 'loading')
    expect(result.isValid).toBe(false)
  })

  it('should return isValid: false if text exceeds max limit', () => {
    const longText = 'a'.repeat(101)
    const result = validateChatInput(longText, 'idle', 100)
    
    expect(result.isValid).toBe(false)
    expect(result.length).toBe(101)
    expect(result.counterText).toBe('101/100')
  })
})