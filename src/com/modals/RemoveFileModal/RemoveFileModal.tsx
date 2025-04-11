import Modal from "@ui/Modal/Modal"
import { type ModalCommonProps, REMOVE_FILE_MODAL } from "@com/modals"
import type { FC } from "react"
import { useAppStore } from "@store/appStore"
import { useIconStore } from "@store/iconStore"

const RemoveFileModal: FC<ModalCommonProps> = () => {
  const closeModal = useAppStore((state) => state.closeModal)
  const removeIcons = useIconStore((state) => state.removeIcons)
  const selectedIcons = useIconStore((state) => state.selectedIcons)
  const size = selectedIcons.size

  return (
    <Modal name={REMOVE_FILE_MODAL}>
      <Modal.Title>Remove Icons</Modal.Title>
      <Modal.Content>
        <div className={"px-10 py-20 pt-30 text-sm font-medium text-gray-600"}>
          Are you sure want to remove
          <b className={"radius-3 mx-2 inline-block bg-gray-100 px-3 py-0 text-gray-800"}>
            {size}
          </b>{" "}
          icon{size > 1 && "s"}?
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className={"flex items-center gap-10"}>
          <button
            type={"button"}
            className={"btn btn-secondary"}
            onClick={() => {
              closeModal(REMOVE_FILE_MODAL)
            }}
          >
            Cancel
          </button>
          <button
            type={"button"}
            className={"btn btn-danger btn-sm"}
            onClick={async () => {
              await removeIcons(Array.from(selectedIcons))
              closeModal(REMOVE_FILE_MODAL)
            }}
          >
            Remove
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveFileModal
