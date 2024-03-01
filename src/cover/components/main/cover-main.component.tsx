import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"
import "./cover-main.style.scss"

export default function CoverMain() {
  const { t } = useTranslation(["cover"])

  return (
    <main className="cover-main">
      <BrandLogo type={BrandLogoType.FULL} />
      <h1 className="cover-h1">Elox Pro</h1>
      <h2>{t("cover:title")}.</h2>
      <p className="lead mt-4">{t("cover:description")}.</p>
      <Link to="/auth" className="btn btn-primary cover-btn-lg">
        {t("cover:action")}
      </Link>
    </main>
  )
}
