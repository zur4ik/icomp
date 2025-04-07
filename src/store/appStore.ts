import { storeCreator } from "@store/utils"
import type { ModalData } from "@com/modals"

type State = {
  modals: Set<string>
  modalData: Record<string, ModalData>
}

type Actions = {
  openModal: (modalName: string, data?: ModalData) => void
  closeModal: (modalName: string) => void
  getModalData: (modalName: string) => ModalData
}

type AppStore = State & Actions

export const useAppStore = storeCreator<AppStore>("appStore", (set) => ({
  modals: new Set(),
  modalData: {},
  openModal: (modalName, data) => {
    set(
      (state) => {
        state.modals.add(modalName)
        state.modalData[modalName] = data || {}
      },
      false,
      "openModal:Action",
    )
  },
  closeModal: (modalName) =>
    set(
      (state) => {
        state.modals.delete(modalName)
        delete state.modalData[modalName]
      },
      false,
      "closeModal:Action",
    ),
  getModalData: (modalName): ModalData => {
    const modalData = useAppStore.getState().modalData[modalName]
    return modalData || {}
  },
}))
