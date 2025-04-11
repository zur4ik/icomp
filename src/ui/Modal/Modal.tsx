import { type FC, type PropsWithChildren } from "react"
import { useAppStore } from "@store/appStore"

type ModalProps = {
  name?: string
  closeOnBackdrop?: boolean
} & PropsWithChildren

type ModalComponent = FC<ModalProps> & {
  Title: FC<PropsWithChildren>
  Content: FC<PropsWithChildren>
  Footer: FC<PropsWithChildren>
}

const Modal: ModalComponent = ({ children, name, closeOnBackdrop = true }) => {
  const closeModal = useAppStore((state) => state.closeModal)
  const isOpen = useAppStore((state) => state.modals.has(name || ""))

  if (!name || !isOpen) {
    return null
  }

  return (
    <div
      className={
        "fixed inset-0 z-5 flex items-center justify-center bg-gray-200/50 backdrop-blur-xs"
      }
      role="modal"
      onClick={(ev) => {
        if (!closeOnBackdrop) return
        const target = ev.target as HTMLElement
        if (target.role === "modal") {
          closeModal(name)
        }
      }}
    >
      <div className={"radius-8 w-400 bg-white p-10 shadow-md"}>{children}</div>
    </div>
  )
}

Modal.Title = ({ children }) => {
  return (
    <div
      className={
        "-mx-10 border-b-1 border-b-gray-200 px-10 pb-5 text-sm font-bold text-gray-800 uppercase"
      }
    >
      {children}
    </div>
  )
}

Modal.Content = ({ children }) => {
  return <div>{children}</div>
}

Modal.Footer = ({ children }) => {
  return <div className={"mt-20 flex items-center justify-end"}>{children}</div>
}

export default Modal
