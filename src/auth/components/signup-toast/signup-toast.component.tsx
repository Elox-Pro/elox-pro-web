import Toast from "react-bootstrap/Toast"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import ToastContainer from "react-bootstrap/ToastContainer"
import { useTranslation } from "react-i18next"
import { setIsSignupNotification } from "../../feautures/auth.slice"

export default function SignupToast() {
  const { t } = useTranslation(["auth"])
  const { username, isSignupNotification } = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()
  const [showToast, setShowToast] = useState(false)
  const closeToast = () => {
    setShowToast(false)
    dispatch(setIsSignupNotification(false))
  }

  useEffect(() => {
    setShowToast(isSignupNotification)
  }, [isSignupNotification])

  return (
    <ToastContainer className="p-3" position="top-start" style={{ zIndex: 1 }}>
      <Toast show={showToast} onClose={closeToast} bg="success">
        <Toast.Header>
          <strong className="me-auto">{t("auth:signup_toast_title")}</strong>
        </Toast.Header>
        <Toast.Body>
          <strong>{username}</strong>,&nbsp;{t("auth:signup_toast_description")}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
