export const FILE_HANDLER_MODAL = "FileHandlerModal"
export const REMOVE_FILE_MODAL = "RemoveFileModal"

export const enabledModals = [FILE_HANDLER_MODAL, REMOVE_FILE_MODAL]

export type ModalCommonProps = {
  show?: boolean
}

export interface ModalData {
  name?: string
  keywords?: string
  svg?: string
}

export interface ModalDataItem {
  name: string
  data: ModalData
}
