/**
 * 텍스트에서 검색어를 분할하여 하이라이트 가능한 부분들로 나눔
 */
export const splitTextForHighlight = (text: string, query: string) => {
  if (!text || !query?.trim()) {
    return {
      parts: [text],
      isMatch: () => false
    }
  }
  
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  
  return {
    parts: text.split(regex).filter(Boolean),
    isMatch: (part: string) => regex.test(part)
  }
}