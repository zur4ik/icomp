import { createComponent } from "@services/componentGenerator"
import { generateIndex } from "@services/indexGenerator"

export const processFile = async (file: string, outputPath: string, skipIndex: boolean = false) => {
  await createComponent(file, outputPath)

  if (!skipIndex) {
    // regenerate index
    generateIndex(outputPath)
  }
}
