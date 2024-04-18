import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"
import "./cover-main.style.scss"

export default function CoverMain() {
  const { t } = useTranslation("cover", { keyPrefix: "main" });

  return (
    <main className="cover-main">
      <BrandLogo type={BrandLogoType.FULL} />
      <h1 className="cover-h1">Elox Pro</h1>
      <h2>{t("title")}.</h2>
      <p className="lead mt-4">{t("description")}.</p>
      <Link to="/auth" className="btn btn-primary cover-btn-lg">
        {t("action")}
      </Link>
    </main>
  )
}
