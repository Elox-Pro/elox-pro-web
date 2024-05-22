import { useTranslation } from "react-i18next";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { Button, Card, Col, ListGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";
import { Company } from "../../types/company.type";
import { usePagination } from "../../../common/hooks/pagination.hook";
import { getCurrentPageFromUrl, getSearchFromUrl } from "../../../common/helpers/get-param-from-url.helper";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import { useState } from "react";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useNavigate } from "react-router-dom";

export default function Companies() {
    const itemsPerPage = 5;
    const { t } = useTranslation("company", { keyPrefix: "companies" });
    const [searchTerm, setSearchTerm] = useState(getSearchFromUrl());
    //TODO: Implement feauture slice to handle pagination and search bar results

    const { data, isSuccess } = useGetCompaniesQuery({
        page: getCurrentPageFromUrl(),
        limit: itemsPerPage,
        searchTerm: searchTerm,
    });

    const totalCount = data?.total || 0;
    const items = data?.companies || [];

    const {
        renderPaginationItems,
        setCurrentPage,
    } = usePagination({ totalCount, itemsPerPage });

    const handleReset = () => {
        setCurrentPage(1);
    }

    return (
        <CPWrapperPage show={isSuccess} >
            <div className="companies">
                <Row className="mb-3">
                    <Col xs={12} className="text-start">
                        <p className="fs-6">{t("title")}</p>
                    </Col>
                    <Col xs={12} className="text-end">
                        <ActionButton
                            text={t("add")}
                            icon="bi bi-plus-circle"
                            onClick={() => {
                                alert(t("add-company-alert"))
                            }} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <SearchBar
                            autoFocus={true}
                            placeholder={t("search-placeholder")}
                            resultCount={totalCount}
                            onSearch={setSearchTerm}
                            onReset={handleReset} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {items.map((company, index) => (
                                        <ListGroupItemCompany company={company} key={index} />
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {renderPaginationItems()}
                    </Col>
                </Row>
            </div>
            <BackToTopButton />
        </CPWrapperPage>
    );
}

type ActionButtonProps = {
    text: string;
    icon: string;
    onClick: () => void;
};

function ActionButton({ text, icon, onClick }: ActionButtonProps) {
    return (
        <div className="d-inline-flex flex-column align-items-center mx-2">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{text}</Tooltip>}>
                <Button type="button" variant="outline-primary" onClick={onClick}>
                    <i className={icon}></i>
                </Button>
            </OverlayTrigger>
        </div>
    );
}

type ListGroupItemCompanyProps = {
    company: Company;
};

function ListGroupItemCompany({ company }: ListGroupItemCompanyProps) {
    return (
        <ListGroup.Item className="px-0 py-3" action>
            <Row className="w-100 align-items-center g-0">
                <Col xs={9}>
                    <Row className="w-100 align-items-center g-0">
                        <Col xs={3} md={3}>
                            <img width={24} src={company.imageUrl} alt="company-image" />
                        </Col>
                        <Col xs={9} md={9}>
                            <p className="mb-0 text-muted">{company.name}</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3} className="text-end">
                    <i className="bi bi-three-dots-vertical fs-4 fw-bold"></i>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}