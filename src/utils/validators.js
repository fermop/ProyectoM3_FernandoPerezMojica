export const validateChatInput = (text, currentStatus, maxLength = 100) => {
  const safeText = text || ''
  const length = safeText.length
  
  const isNotEmpty = length > 0 && safeText.trim() !== ''
  const isNotLoading = currentStatus !== 'loading'
  const isWithinLimit = length <= maxLength
  
  const isValid = isNotEmpty && isNotLoading && isWithinLimit
  
  return {
    length,
    isValid,
    counterText: `${length}/${maxLength}`
  }
}