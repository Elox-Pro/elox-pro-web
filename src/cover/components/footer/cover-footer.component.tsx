import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"

export default function CoverFooter() {
  const { t } = useTranslation(["cover"])

  return (
    <footer className="mt-auto">
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
