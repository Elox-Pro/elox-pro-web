import { useTranslation } from "react-i18next";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { Button, Card, Col, ListGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";
import { Company } from "../../types/company.type";
import { usePagination } from "../../../common/hooks/pagination.hook";
import { getCurrentPageFromUrl } from "../../../common/helpers/get-param-from-url.helper";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import { useEffect } from "react";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setCurrentPage, setItemsPerPage, setResultCount } from "../../features/company-pagination.slice";
import { setSearchBarFocus, setSearchBarReset, setSearchBarText } from "../../features/company-search-bar.slice";
import { setCompanyList } from "../../features/company.slice";
import CommonPagination from "../../../common/components/pagination/common-pagination.component";
import StickyWrapper from "../../../common/components/sticky-wrapper/sticky-wrapper.component";

export default function Companies() {
    const { t } = useTranslation("company", { keyPrefix: "companies" });
    const pagination = useAppSelector((state) => state.companyPagination);
    const searchBar = useAppSelector((state) => state.companySearchBar);
    const company = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetCompaniesQuery({
        page: getCurrentPageFromUrl(),
        limit: pagination.itemsPerPage,
        searchTerm: searchBar.searchText,
    });

    useEffect(() => {
        dispatch(setCompanyList(data?.companies || []));
        dispatch(setResultCount(data?.total || 0));
        dispatch(setItemsPerPage(pagination.itemsPerPage));
    }, [data]);

    return (
        <>
            <StickyWrapper>
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
            </StickyWrapper>
            <StickyWrapper sticky>
                <Row className="mb-3">
                    <Col xs={12}>
                        <SearchBar
                            pagination={pagination}
                            searchBar={searchBar}
                            setSearchText={setSearchBarText}
                            setFocus={setSearchBarFocus}
                            setReset={setSearchBarReset}
                            setCurrentPage={setCurrentPage}
                            placeholder={t("search-placeholder")}
                        />
                    </Col>
                </Row>
            </StickyWrapper>
            <CPWrapperPage show={isSuccess} >
                <div className="companies">
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        {company.list.map((company, index) => (
                                            <ListGroupItemCompany company={company} key={index} />
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <PaginationCompany />
                        </Col>
                    </Row>
                </div>
                <BackToTopButton />
            </CPWrapperPage>
        </>
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

function PaginationCompany() {
    const pagination = useAppSelector((state) => state.companyPagination);
    const { paginationItems } = usePagination({ pagination, setCurrentPage, setSearchBarFocus });
    return <CommonPagination items={paginationItems} />;
}