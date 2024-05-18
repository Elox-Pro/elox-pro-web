import { useTranslation } from "react-i18next"
import AuthFormHeader from "../../../auth/components/auth-form-header/auth-form-header.component"
import RecoverPasswordResetForm from "../recover-password-reset-form/recover-password-reset-form.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function RecoverPasswordReset() {
  const { t } = useTranslation("recover-password", { keyPrefix: "reset" })

  const { resetFormEnabled } = useAppSelector((state) => state.recoverPassword)
  const navigate = useNavigate()

  useEffect(() => {
    if (!resetFormEnabled) {
      navigate(-1)
    }
  }, [])

  if (!resetFormEnabled) {
    return null
  }

  return (
    <>
      <AuthFormHeader title={t("title")} description={t("description")} />
      <RecoverPasswordResetForm />
    </>
  )
}
