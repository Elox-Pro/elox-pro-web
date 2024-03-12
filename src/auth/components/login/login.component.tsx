import { useTranslation } from "react-i18next"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import LoginForm from "../login-form/login-form.component"
import AuthLink from "../auth-link/auth-link.component"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setIsTfaPending } from "../../feautures/login.slice"

export default function Login() {
  const { t } = useTranslation(["common", "login"])
  const { isTfaPending } = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

  const handleLoginLink = () => {
    dispatch(setIsTfaPending(false))
  }

  const title = isTfaPending ? t("login:tfa_title") : t("login:title")

  return (
    <>
      <div className="text-center">
        <h3 className="text-body-highlight">{title}</h3>
        <p className="text-body-tertiary">{t("login:description")}</p>
      </div>

      {!isTfaPending && <LoginForm />}
      {isTfaPending && <ValidateTfaForm />}

      <p className="text-end">
        <AuthLink text={t("login:forgot_password")} />
        {isTfaPending && <AuthLink text={t("login:title")} onClick={handleLoginLink} />}
      </p>
    </>
  )
}
