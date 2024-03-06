import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useTranslation } from "react-i18next"

export default function CoverFooter() {
  const { t } = useTranslation(["cover"])

  return (
    <footer className="mt-auto text-center">
      <Row>
        <Col xs={12}>
          <p className="mt-5">{t("cover:footer_text_1")}</p>
          <p className="mt-4">{t("cover:footer_text_2")}</p>
          <p className="mt-3">
            <small>{t("cover:footer_text_3")}</small>
          </p>
        </Col>
      </Row>
    </footer>
  )
}
