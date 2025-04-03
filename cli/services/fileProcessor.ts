import { createComponent } from "@services/componentGenerator"
import { generateIndex } from "@services/indexGenerator"

export const processFile = async (file: string, outputPath: string) => {
  await createComponent(file, outputPath)

  // regenerate index
  generateIndex(outputPath)
}
