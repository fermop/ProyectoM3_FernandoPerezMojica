import { appendUserMessage, appendAssistantMessage, getTrimmedHistory } from '#/engine/history.js'

describe('history.js', () => {
  it('should append a user message without mutating the original array', () => {
    const originalHistory = []
    const nextHistory = appendUserMessage(originalHistory, '¡Hola!')

    expect(originalHistory).toEqual([])
    expect(nextHistory).toEqual([{ role: 'user', content: '¡Hola!' }])
  })

  it('should append an assistant message with the "assistant" role', () => {
    const nextHistory = appendAssistantMessage([], '¡Entendido!')
    expect(nextHistory).toEqual([{ role: 'assistant', content: '¡Entendido!' }])
  })

  it('should trim the history to the specified maximum number of turns', () => {
    const messages = [
      { role: 'user', content: 'Mensaje 1' },
      { role: 'assistant', content: 'Mensaje 2' },
      { role: 'user', content: 'Mensaje 3' },
    ]

    const trimmed = getTrimmedHistory(messages, 2)

    expect(trimmed).toHaveLength(2)
    expect(trimmed).toEqual([
      { role: 'assistant', content: 'Mensaje 2' },
      { role: 'user', content: 'Mensaje 3' }
    ])
  })
})