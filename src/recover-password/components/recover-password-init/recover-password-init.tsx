import { useTranslation } from "react-i18next"
import AuthFormHeader from "../../../auth/components/auth-form-header/auth-form-header.component"
import RecoverPasswordInitForm from "../recover-password-init-form/recover-password-init-form.component"

export default function RecoverPasswordInit() {
  const { t } = useTranslation(["common", "recover-password"])

  return (
    <>
      <AuthFormHeader title={t("recover-password:init_title")} description={t("recover-password:init_description")} />
      <RecoverPasswordInitForm />
    </>
  )
}
