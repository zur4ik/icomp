export const cleanKeywords = (keywords: string) => {
  if (!keywords) {
    return ""
  }
  return keywords
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s]/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .join(" ")
}
