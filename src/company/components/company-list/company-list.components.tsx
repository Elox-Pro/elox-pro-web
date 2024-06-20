import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import { useEffect } from "react";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import StickyWrapper from "../../../common/components/sticky-wrapper/sticky-wrapper.component";
import IconButton from "../../../common/components/icon-button/icon-button.component";
import CreateCompanyModal from "../create-company-modal/create-copmany-modal.component";
import Paginator from "../../../common/components/paginator/paginator.component";
import PageHeader from "../../../common/components/page-header/page-header.component";
import { setPaginatorCurrentPage, setPaginatorResults } from "../../../common/features/paginator.slice";
import { setSearchBarFocus } from "../../../common/features/search-bar.slice";
import CompanyListItem from "../company-list-item/company-list-item.component";
import { setCompanies, setShowCreateCompanyModal } from "../../features/company.slice";

export default function CompanyList() {

    const searchBar = useAppSelector((state) => state.searchBar);
    const paginator = useAppSelector((state) => state.paginator);
    const { companies } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetCompaniesQuery({
        page: paginator.currentPage,
        limit: paginator.itemsPerPage,
        searchTerm: searchBar.text,
    });

    const backToTopOnClick = () => {
        dispatch(setSearchBarFocus(true));
    }

    const paginatorOnChange = () => {
        dispatch(setSearchBarFocus(true));
    }

    const searchBarOnChange = () => {
        dispatch(setPaginatorCurrentPage(1));
    };

    const searchBarOnReset = () => {
        dispatch(setPaginatorCurrentPage(1));
    };

    const showCreateCompanyModalOnClick = () => {
        dispatch(setShowCreateCompanyModal(true));
    }

    useEffect(() => {

        if (data && isSuccess) {
            dispatch(setCompanies(data.companies || []));
            dispatch(setPaginatorResults(data.total || 0));
        }

    }, [data]);

    return (
        <>
            <StickyWrapper>
                <PageHeader title="Companies" />
            </StickyWrapper>
            <StickyWrapper sticky>
                <Row className="g-0">
                    <Col xs={10} md={11}>
                        <SearchBar
                            placeholder="Search Company"
                            onChange={searchBarOnChange}
                            onReset={searchBarOnReset}
                        />
                    </Col>
                    <Col xs={2} md={1}>
                        <IconButton
                            tooltip={"Create Company"}
                            icon="bi bi-plus-circle"
                            onClick={showCreateCompanyModalOnClick} />
                    </Col>
                </Row>
            </StickyWrapper>
            <CreateCompanyModal />
            <CPWrapperPage show={isSuccess} >
                <Row className="mb-3">
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {companies.map((company, index) => (
                                        <CompanyListItem company={company} key={index} />
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Paginator onChange={paginatorOnChange} />
                    </Col>
                </Row>
                <BackToTopButton onClick={backToTopOnClick} />
            </CPWrapperPage>
        </>
    );
}
