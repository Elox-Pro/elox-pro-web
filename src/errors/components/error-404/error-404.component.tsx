import { useTranslation } from "react-i18next"
import ErrorPage from "../error-page.component"

export default function Error404() {
  const { t } = useTranslation(["error-page"])
  return <ErrorPage code={404} message={t("error-page:not_found")} />
}
