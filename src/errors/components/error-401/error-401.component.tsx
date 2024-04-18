import { useTranslation } from "react-i18next"
import ErrorPage from "../error-page.component"
import { useAuth } from "../../../auth/providers/auth.provider"
import { useEffect } from "react"

export default function Error401() {
  const { t } = useTranslation("error-page")
  const { resetActiveUser } = useAuth()
  useEffect(() => {
    resetActiveUser()
  }, [])

  return <ErrorPage code={401} message={t("unauthorized")} />
}
