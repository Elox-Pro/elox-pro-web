import { useTranslation } from "react-i18next"
import AuthFormHeader from "../../../auth/components/auth-form-header/auth-form-header.component"
import RecoverPasswordResetForm from "../recover-password-reset-form/recover-password-reset-form.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function RecoverPasswordReset() {
  const { t } = useTranslation(["common", "recover-password"])

  const { isResetFormEnabled } = useAppSelector((state) => state.recoverPassword)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isResetFormEnabled) {
      navigate(-1)
    }
  }, [])

  return (
    <>
      {isResetFormEnabled && (
        <>
          <AuthFormHeader
            title={t("recover-password:reset_title")}
            description={t("recover-password:reset_description")}
          />
          <RecoverPasswordResetForm />
        </>
      )}
    </>
  )
}
