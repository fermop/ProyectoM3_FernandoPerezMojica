export const callAI = async (payload) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const err = new Error(data.error || `HTTP ${response.status}`)
    err.status = response.status
    err.retryAfterSeconds = data.retryAfterSeconds
    throw err
  }

  return data
}