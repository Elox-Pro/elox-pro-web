import Toast from "react-bootstrap/Toast"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useTranslation } from "react-i18next"
import { setSignupSuccess } from "../../feautures/auth.slice"
import DefaultToast from "../../../common/components/default-toast/default-toast.component"

export default function SignupToast() {
  const { t } = useTranslation(["auth"])
  const { username } = useAppSelector((state) => state.tfa)
  const { signupSuccess } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const handleOnCloseAction = () => {
    dispatch(setSignupSuccess(false))
  }
  if (!username) {
    return <></>
  }
  return (
    <DefaultToast show={signupSuccess} onCloseAction={handleOnCloseAction}>
      <Toast.Header>
        <strong className="me-auto">{t("signup_toast_title")}</strong>
      </Toast.Header>
      <Toast.Body>
        <strong>{username}</strong>,&nbsp;{t("signup_toast_description")}
      </Toast.Body>
    </DefaultToast>
  )
}
