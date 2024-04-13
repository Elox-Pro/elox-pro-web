import Toast from "react-bootstrap/Toast"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useTranslation } from "react-i18next"
import { setResetPasswordSuccess } from "../../features/recover-password.slice"
import DefaultToast from "../../../common/components/default-toast/default-toast.component"

export default function 
RecoverPasswordToast() {
  const { t } = useTranslation(["recover-password"])
  const { username } = useAppSelector((state) => state.tfa)
  const { resetPasswordSuccess } = useAppSelector((state) => state.recoverPassword)
  const dispatch = useAppDispatch()
  const handleOnCloseAction = () => {
    dispatch(setResetPasswordSuccess(false))
  }

  if (!username) {
    return <></>
  }

  return (
    <DefaultToast show={resetPasswordSuccess} onCloseAction={handleOnCloseAction}>
      <Toast.Header>
        <strong className="me-auto">{t("reset_password_success_title")}</strong>
      </Toast.Header>
      <Toast.Body>
        <strong>{username}</strong>,&nbsp;{t("reset_password_success_description")}
      </Toast.Body>
    </DefaultToast>
  )
}
