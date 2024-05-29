import { useTranslation } from "react-i18next";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { Col, Container, Row } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";
import { usePagination } from "../../../common/hooks/pagination.hook";
import { getCurrentPageFromUrl } from "../../../common/helpers/get-param-from-url.helper";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import { useEffect } from "react";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setCurrentPage, setItemsPerPage, setResultCount } from "../../features/company-pagination.slice";
import { setSearchBarFocus, setSearchBarReset, setSearchBarText } from "../../features/company-search-bar.slice";
import { setCompanyManageModal, setCompanyList, setCompanySelected } from "../../features/company.slice";
import CommonPagination from "../../../common/components/pagination/common-pagination.component";
import StickyWrapper from "../../../common/components/sticky-wrapper/sticky-wrapper.component";
import IconButton from "../../../common/components/icon-button/icon-button.component";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";
import ModalAction from "../../../common/components/modal-action/modal-action.component";
import { Company } from "../../types/company.type";
import CardListGroup from "../../../common/components/card-list-group/card-list-group.component";
import { useNavigate } from "react-router-dom";

export default function Companies() {
    return (
        <>
            <Header />
            <Body />
            <ManageCompanyModal />
        </>
    );
}

function Header() {
    const { t } = useTranslation("company", { keyPrefix: "companies" });
    const searchBar = useAppSelector((state) => state.companySearchBar);
    const pagination = useAppSelector((state) => state.companyPagination);
    return (
        <>
            <StickyWrapper>
                <Row>
                    <Col xs={12} className="text-start">
                        <p className="fs-6">{t("title")}</p>
                    </Col>
                    <Col xs={12} className="text-end">
                        <IconButton
                            text={t("add")}
                            icon="bi bi-plus-circle"
                            onClick={() => {
                                alert(t("add-company-alert"))
                            }} />
                    </Col>
                </Row>
            </StickyWrapper>
            <StickyWrapper sticky>
                <Row>
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
        </>
    )
}

function Body() {

    const searchBar = useAppSelector((state) => state.companySearchBar);
    const company = useAppSelector((state) => state.company);
    const pagination = useAppSelector((state) => state.companyPagination);
    const { paginationItems } = usePagination({ pagination, setCurrentPage, setSearchBarFocus });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data, isSuccess } = useGetCompaniesQuery({
        page: getCurrentPageFromUrl(),
        limit: pagination.itemsPerPage,
        searchTerm: searchBar.searchText,
    });

    const handleSearchBarFocus = () => {
        dispatch(setSearchBarFocus(true));
    }

    useEffect(() => {
        dispatch(setCompanyList(data?.companies || []));
        dispatch(setResultCount(data?.total || 0));
        dispatch(setItemsPerPage(pagination.itemsPerPage));
    }, [data]);

    const handleCompanyInfo = (company: Company) => {
        dispatch(setCompanySelected(company));
        navigate(`/cpanel/companies/${company.id}`);
    }

    return (
        <CPWrapperPage show={isSuccess} >
            <div className="companies">
                <Row className="mb-3">
                    <Col xs={12}>
                        <CardListGroup.Container>
                            {company.list.map((company, index) => (
                                <ListGroupItem.Container
                                    key={index}
                                    onClick={() => {
                                        handleCompanyInfo(company)
                                    }}>
                                    <ListGroupItem.Body>
                                        <ListGroupItem.BodyImage
                                            src={company.imageUrl}
                                            alt={company.name} />
                                        <ListGroupItem.BodySection>
                                            <p className="mb-0 text-muted">
                                                {company.name}
                                            </p>
                                        </ListGroupItem.BodySection>
                                    </ListGroupItem.Body>
                                    <ListGroupItem.ChevronIcon />
                                </ListGroupItem.Container>
                            ))}
                        </CardListGroup.Container>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <CommonPagination items={paginationItems} />
                    </Col>
                </Row>
            </div>
            <BackToTopButton onClick={handleSearchBarFocus} />
        </CPWrapperPage>
    );
}

function ManageCompanyModal() {

    const company = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const handleHideModal = () => {
        dispatch(setCompanyManageModal(false));
    }

    if (company.selected === null) {
        return null
    }

    return (
        <ModalAction.Wrapper show={company.manageModal}>
            <ModalAction.Header onClose={handleHideModal}>
                <ModalAction.HeaderTitle
                    img={company.selected.imageUrl}
                    alt={company.selected.name}
                    title={company.selected.name} />
            </ModalAction.Header>
            <ModalAction.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <p className="text-muted">
                                <small>
                                    <i className="bi bi-gear me-2"></i>
                                    <span>Manage Company</span>
                                </small>
                            </p>
                        </Col>
                        <Col xs={12}>
                            <CardListGroup.Container>
                                <ListGroupItem.Container>
                                    <ListGroupItem.Body>
                                        <ListGroupItem.BodyIcon
                                            iconClass="bi bi-eye" />
                                        <ListGroupItem.BodySection>
                                            <p className="mb-0 text-muted">
                                                Show company
                                            </p>
                                        </ListGroupItem.BodySection>
                                    </ListGroupItem.Body>
                                    <ListGroupItem.ChevronIcon />
                                </ListGroupItem.Container>
                                <ListGroupItem.Container>
                                    <ListGroupItem.Body>
                                        <ListGroupItem.BodyIcon
                                            iconClass="bi bi-pencil-square" />
                                        <ListGroupItem.BodySection>
                                            <p className="mb-0 text-muted">
                                                Edit company
                                            </p>
                                        </ListGroupItem.BodySection>
                                    </ListGroupItem.Body>
                                    <ListGroupItem.ChevronIcon />
                                </ListGroupItem.Container>
                                <ListGroupItem.Container>
                                    <ListGroupItem.Body>
                                        <ListGroupItem.BodyIcon
                                            iconClass="bi bi-trash" />
                                        <ListGroupItem.BodySection>
                                            <p className="mb-0 text-muted">
                                                Delete company
                                            </p>
                                        </ListGroupItem.BodySection>
                                    </ListGroupItem.Body>
                                    <ListGroupItem.ChevronIcon />
                                </ListGroupItem.Container>
                            </CardListGroup.Container>
                        </Col>
                    </Row>
                </Container>
            </ModalAction.Body>
        </ModalAction.Wrapper>
    );
}