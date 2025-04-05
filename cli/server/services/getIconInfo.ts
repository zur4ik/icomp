import type { IconInfo } from "@shared/types"
import { getComponentName, getIconName } from "@shared"
import { getIconKeywords } from "./getIconKeywords"
import { getIconDate } from "./getIconDate"

export const getIconInfo = (inputPath: string, fileName: string): IconInfo => {
  return {
    name: getIconName(fileName),
    keywords: getIconKeywords(inputPath, fileName),
    component: getComponentName(fileName),
    file: fileName,
    generated: false,
    date: getIconDate(inputPath, fileName),
  }
}
