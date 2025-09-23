import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export const storeCreator = <T>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never], ["zustand/immer", never]], []>,
) => {
  return create<T>()(devtools(immer(initializer), { name }))
}
