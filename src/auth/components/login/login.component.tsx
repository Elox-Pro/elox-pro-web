import { useTranslation } from "react-i18next"
import LoginForm from "../login-form/login-form.component"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Login() {
  const { t } = useTranslation(["common", "auth"])
  const title = t("auth:login_title")

  return (
    <>
      <AuthFormHeader title={title} description={t("auth:login_description")} />
      <LoginForm />
    </>
  )
}
