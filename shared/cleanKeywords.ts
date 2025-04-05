export const cleanKeywords = (keywords: string) => {
  if (!keywords) {
    return ""
  }
  return (
    keywords
      // remove HTML tags
      .replace(/<[^>]+>/g, "")

      // remove special characters
      .replace(/[^\w\s,]/g, "")

      // replace commas with spaces
      .replace(/,/g, " ")

      // replace multiple spaces with a single space
      .replace(/\s+/g, " ")

      // remove leading and trailing spaces
      .trim()
      .toLowerCase()
      // filter out 2 or less character words
      .split(" ")
      .filter((word) => word.length > 2)
      .join(" ")
  )
}
