import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import AuthFormHeader from "../../../auth/components/auth-form-header/auth-form-header.component"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function VaildateTfa() {
  const { t } = useTranslation("tfa", { keyPrefix: "validate-tfa" })
  const { tfaPending: isTfaPending } = useAppSelector((state) => state.tfa)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isTfaPending) {
      navigate(-1)
    }
  }, [])

  return (
    <>
      {isTfaPending && (
        <>
          <AuthFormHeader title={t("title")} description={t("description")} />
          <ValidateTfaForm />
        </>
      )}
    </>
  )
}
