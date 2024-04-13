import React, { useEffect, useState } from "react"
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

type ToastProps = {
  show: boolean
  onCloseAction?: () => void
} & React.PropsWithChildren

export default function DefaultToast({ show, onCloseAction: onCloseAction, children }: ToastProps) {
  const [showToast, setShowToast] = useState(false)
  const delay_in_ms = 1000 * 10
  const closeToast = () => {
    setShowToast(false)
    if (onCloseAction) {
      onCloseAction()
    }
  }

  useEffect(() => {
    setShowToast(show)
  }, [show])

  return (
    <ToastContainer className="p-3 position-relative" position="top-start" style={{ zIndex: 1 }}>
      <Toast show={showToast} onClose={closeToast} bg="success" delay={delay_in_ms} autohide={true}>
        {children}
      </Toast>
    </ToastContainer>
  )
}
