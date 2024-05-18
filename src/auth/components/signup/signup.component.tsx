import { useTranslation } from "react-i18next"
import SignupForm from "../signup-form/signup-form.component"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Signup() {
  const { t } = useTranslation("auth", { keyPrefix: "signup" })
  return (
    <>
      <AuthFormHeader title={t("title")} description={t("description")} />
      <SignupForm />
    </>
  )
}
