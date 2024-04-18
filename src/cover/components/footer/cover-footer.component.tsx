import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useTranslation } from "react-i18next"

export default function CoverFooter() {
  const { t } = useTranslation("cover", { keyPrefix: "footer" });

  return (
    <footer className="p-2">
      <Row>
        <Col xs={12}>
          <hr />
          <ul className="list-unstyled text-muted">
            <li>
              <p>
                <small>
                  {t("text1")}
                </small>
              </p>
            </li>
            <li>
              <p>
                <small>
                  {t("text2")}
                </small>
              </p>
            </li>
            <li>
              <p>
                <small>
                  {t("text3")}
                </small>
              </p>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  )
}
