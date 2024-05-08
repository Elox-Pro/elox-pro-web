import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../../../common/components/language-switcher/language-switcher.component";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../../../common/components/theme-switcher/theme-switcher.component";

export default function CoverFooter() {
  const { t } = useTranslation("cover", { keyPrefix: "footer" });

  return (
    <div className="border-top mt-5">
      <footer className="pt-5 px-5 bg-body-tertiary">
        <Row>
          <Col md={6}>
            <h4>{t("about.title")}</h4>
            <p>
              {t("about.text-1")}
              <br />
              {t("about.text-2")}
            </p>
          </Col>
          <Col md={6}>
            <h4>{t("links.title")}</h4>
            <ul className="list-unstyled">
              <li className="nav-item">
                <NavLink to={"/auth/signin"} className="nav-link">
                  {t("links.signin")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/auth/signup"} className="nav-link">
                  {t("links.signup")}
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  {t("links.terms")}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  {t("links.privacy")}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  {t("links.contact")}
                </span>
              </li>
            </ul>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </Col>
        </Row>
      </footer>
      <footer className="bg-body-tertiary">
        <Row className="py-5">
          <Col>
            <p className="text-center"><small>{t("dedication")}</small></p>
          </Col>
        </Row>
      </footer>
      <footer>
        <Row className="py-5">
          <Col>
            <p className="text-center"><small>{t("copryright")}</small></p>
          </Col>
        </Row>
      </footer>
    </div>
  )
}
