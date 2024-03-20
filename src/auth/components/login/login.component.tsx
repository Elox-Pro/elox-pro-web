import { useTranslation } from "react-i18next"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import LoginForm from "../login-form/login-form.component"
import AuthLink from "../auth-link/auth-link.component"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setIsTfaPending } from "../../feautures/login.slice"

export default function Login() {
  const { t } = useTranslation(["common", "auth"])
  const { isTfaPending } = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

  const handleLoginLink = () => {
    dispatch(setIsTfaPending(false))
  }

  const title = isTfaPending ? t("auth:tfa_title") : t("auth:login_title")

  return (
    <>
      <div className="text-center">
        <h3 className="text-body-highlight">{title}</h3>
        <p className="text-body-tertiary">{t("auth:login_description")}</p>
      </div>

      {!isTfaPending && <LoginForm />}
      {isTfaPending && <ValidateTfaForm />}

      <p className="text-end">
        <AuthLink text={t("auth:forgot_password")} />
        {isTfaPending && <AuthLink text={t("auth:login_title")} onClick={handleLoginLink} />}
      </p>
    </>
  )
}
