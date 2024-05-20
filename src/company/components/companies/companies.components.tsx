import { useTranslation } from "react-i18next";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";

export default function Companies() {
    const { t } = useTranslation("company", { keyPrefix: "companies" });
    const { data, isSuccess } = useGetCompaniesQuery();
    return (
        <CPWrapperPage show={isSuccess} >
            
            <div className="companies">
                <Row>
                    <Col xs={12} className="text-start">
                        <p className="fs-6">{t("title")}</p>
                    </Col>
                    <Col xs={12} className="text-end">
                        <ActionButton
                            text={t("add")}
                            icon="bi bi-plus-circle"
                            onClick={() => {
                                alert(t("add_company_alert"))
                            }} />
                        <ActionButton
                            text={t("add")}
                            icon="bi bi-plus-circle"
                            onClick={() => {
                                alert(t("add_company_alert"))
                            }} />
                        <ActionButton
                            text={t("add")}
                            icon="bi bi-plus-circle"
                            onClick={() => {
                                alert(t("add_company_alert"))
                            }} />
                    </Col>
                </Row>
                <hr />
                <div className="sticky-top bg-body p-5" style={{top:"3.5rem"}}>
                <h1>Companies</h1>
            </div>
                <Row>
                    <Col xs={12}>
                        {data?.companies.map((company, index) => (
                            <div key={index}>
                                <img width={16} src={company.imageUrl} alt="company-image" />
                                <p>{company.name}</p>
                                <hr />
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </CPWrapperPage>
    )
}

type ActionButtonProps = {
    text: string
    icon: string
    onClick: () => void
}
function ActionButton({ text, icon, onClick }: ActionButtonProps) {
    return (
        <div className="d-inline-flex flex-column align-items-center mx-2">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{text}</Tooltip>}>
                <Button type="button" variant="outline-primary" onClick={onClick}>
                    <i className={icon}></i>
                </Button>
            </OverlayTrigger>
        </div>
    )
}