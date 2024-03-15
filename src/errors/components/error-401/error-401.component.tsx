import { useTranslation } from "react-i18next"
import ErrorPage from "../error-page.component"

export default function Error401() {
  const { t } = useTranslation(["error-page"])
  return <ErrorPage code={401} message={t("error-page:unauthorized")} />
}
