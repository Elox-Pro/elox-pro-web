import { useTranslation } from "react-i18next"
import ErrorPage from "../error-page.component"
import { useAuth } from "../../../auth/hooks/auth.hook"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setOverlay } from "../../../common/features/common.slice"

export default function Error401() {
  const { t } = useTranslation("error-page")
  const dispatch = useDispatch()
  const { resetActiveUser } = useAuth()
  useEffect(() => {
    dispatch(setOverlay(false))
    resetActiveUser()
  }, [])

  return <ErrorPage code={401} message={t("unauthorized")} />
}
