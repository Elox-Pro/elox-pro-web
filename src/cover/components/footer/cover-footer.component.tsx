import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../../../common/components/language-switcher/language-switcher";
import { NavLink } from "react-router-dom";

export default function CoverFooter() {
  const { t } = useTranslation("cover", { keyPrefix: "footer" });

  return (
    <footer className="p-5 bg-footer">
      <Row>
        <Col md={6}>
          <h4>About Elox Pro</h4>
          <p>
            Elox Pro is a user-friendly platform that simplifies personal loan management. Our platform allows you to create, edit, and monitor loans, track payments, and generate reports with ease. Experience automated contract generation, digital signing, and secure document storage. <br />
            With multi-level access, lenders can manage loans within their designated areas, while super-administrators have system-wide oversight. Elox Pro prioritizes privacy and efficiency, empowering you to take control of your finances from anywhere. <br />
          </p>
        </Col>
        <Col md={6}>
          <h4>Links</h4>
          <ul className="list-unstyled">
            <li>
              <NavLink to={"/auth/signin"}>
                {t("signin")}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/auth/signup"}>
                {t("signup")}
              </NavLink>
            </li>
          </ul>
          <LanguageSwitcher />
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <p>
            <small>{t("text1")}</small>
            {t("text2")}
            {t("text3")}
          </p>
        </Col>
      </Row>
    </footer>



  )
}
