import FileHandlerModal from "@com/modals/FileHandlerModal/FileHandlerModal"
import { useAppStore } from "@store/appStore"
import { FILE_HANDLER_MODAL, REMOVE_FILE_MODAL } from "@com/modals/index"
import RemoveFileModal from "@com/modals/RemoveFileModal/RemoveFileModal"

export const Modals = () => {
  const modals = useAppStore((state) => state.modals)
  const fileHandlerModal = modals.has(FILE_HANDLER_MODAL)
  const removeFileModal = modals.has(REMOVE_FILE_MODAL)

  return (
    <div id={"modals"}>
      <FileHandlerModal show={fileHandlerModal} />
      <RemoveFileModal show={removeFileModal} />
    </div>
  )
}

export default Modals
