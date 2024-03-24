import { useTranslation } from "react-i18next"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import LoginForm from "../login-form/login-form.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Login() {
  const { t } = useTranslation(["common", "auth"])
  const { isTfaPending } = useAppSelector((state) => state.login)
  // const title = isTfaPending ? t("auth:tfa_title") : t("auth:login_title")
  const title = t("auth:login_title")

  return (
    <>
      <AuthFormHeader title={title} description={t("auth:login_description")} />
      <LoginForm />
      {/* {!isTfaPending && <LoginForm />} */}
      {/* {isTfaPending && <ValidateTfaForm />} */}
    </>
  )
}
