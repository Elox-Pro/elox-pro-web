import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { useGetCompanyQuery } from "../../api/company.api";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import CardListGroup from "../../../common/components/card-list-group/card-list-group.component";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";

export default function CompanyInfo() {
    const { t } = useTranslation("company", { keyPrefix: "info" });
    const company = useAppSelector((state) => state.company);
    const companySelected = company.selected;

    if (companySelected === null) {
        return null;
    }

    const { data, isSuccess } = useGetCompanyQuery({
        id: companySelected.id,
    });

    if (!isSuccess || !data) {
        return null;
    }

    console.log(data);
    console.log(isSuccess);

    //TODO: Add company avatar item disabled

    return (
        <CPWrapperPage show={isSuccess} >
            <Row className="text-center">
                <Col xs={12}>
                    <p className="fs-1 mb-0">{t("title")}</p>
                    <p>{t("subtitle")}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <CardListGroup.Container>
                        <CardListGroup.IconTitle value={"Basic Info"} />
                        <ListGroupItem.Container
                            onClick={() => {
                                alert(t("company-info-alert"))
                            }}>
                            <ListGroupItem.Body>
                                <ListGroupItem.BodyLabel value="name" />
                                <ListGroupItem.BodyValue value={data.company.name} />
                            </ListGroupItem.Body>
                            <ListGroupItem.ChevronIcon />
                        </ListGroupItem.Container>
                    </CardListGroup.Container>

                </Col>
            </Row>
            <BackToTopButton />
        </CPWrapperPage>
    )
}