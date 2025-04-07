import FileHandlerModal from "@com/modals/FileHandlerModal/FileHandlerModal"
import { useAppStore } from "@store/appStore"
import { FILE_HANDLER_MODAL } from "@com/modals/index"

export const Modals = () => {
  const modals = useAppStore((state) => state.modals)
  const fileHandlerModal = modals.has(FILE_HANDLER_MODAL)

  return (
    <div id={"modals"}>
      <FileHandlerModal show={fileHandlerModal} />
    </div>
  )
}

export default Modals
