export const FILE_HANDLER_MODAL = "FileHandlerModal"

export const enabledModals = [FILE_HANDLER_MODAL]

export interface ModalData {
  name?: string
  keywords?: string
  svg?: string
}

export interface ModalDataItem {
  name: string
  data: ModalData
}
