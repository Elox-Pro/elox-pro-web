import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import SignupForm from "../signup-form/signup-form.component"
import AuthFormHeader from "../auth-form-header/auth-form-header.component"

export default function Signup() {
  const { t } = useTranslation(["common", "auth"])
  const { isTfaPending } = useAppSelector((state) => state.login)
  // const title = isTfaPending ? t("auth:tfa_title") : t("auth:signup_title")
  const title = t("auth:signup_title")

  return (
    <>
      <AuthFormHeader title={title} description={t("auth:signup_description")} />
      <SignupForm />
      {/* {!isTfaPending && <SignupForm />}
      {isTfaPending && <ValidateTfaForm />} */}
    </>
  )
}
