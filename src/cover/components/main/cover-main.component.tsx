import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"

export default function CoverMain() {
  const { t } = useTranslation(["cover"])

  return (
    <main className="px-3">
      <BrandLogo type={BrandLogoType.FULL} />
      <h1 className="h1">Elox Pro</h1>
      <h2>{t("cover:title")}.</h2>
      <p className="lead mt-4">{t("cover:description")}.</p>
      <Link to="/auth" className="btn btn-dark bd-btn-lg fw-bold mt-4" type="button">
        {t("cover:action")}
      </Link>
    </main>
  )
}
