import { useTranslation } from "react-i18next"
import SignupForm from "../signup-form/signup-form.component"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Signup() {
  const { t } = useTranslation(["common", "auth"])
  const title = t("auth:signup_title")

  return (
    <>
      <AuthFormHeader title={title} description={t("auth:signup_description")} />
      <SignupForm />
    </>
  )
}
