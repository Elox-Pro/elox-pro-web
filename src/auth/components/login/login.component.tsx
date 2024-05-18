import { useTranslation } from "react-i18next"
import LoginForm from "../login-form/login-form.component"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Login() {
  const { t } = useTranslation("auth", { keyPrefix: "login" })
  return (
    <>
      <AuthFormHeader title={t("title")} description={t("description")} />
      <LoginForm />
    </>
  )
}
