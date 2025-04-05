export const cleanFileName = (fileName: string) => {
  if (!fileName) {
    return ""
  }

  // allow only alphanumeric characters and hyphens
  return (
    fileName
      .toLowerCase()
      // replace dot and space with hyphen
      .replace(/[\s.]+/g, "-")
      // remove all non-alphanumeric characters except hyphen
      .replace(/[^a-z0-9-]/g, "")
  )
}
