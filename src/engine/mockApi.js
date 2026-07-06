let requestCount = 0

export const callAI = async (payload) => {
  requestCount += 1
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `msg_mock_${requestCount}`,
        type: "message",
        role: "assistant",
        content: [{ type: "text", text: "(Mock) Entendido, shinobi." }],
        stop_reason: "end_turn"
      })
    }, 1000)
  })
}