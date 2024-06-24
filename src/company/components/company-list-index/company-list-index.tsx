import WrapperPage from "../../../common/components/wrapper-page/wrapper-page";
import { Col, Row } from "react-bootstrap";
import { useGetCompaniesQuery } from "../../api/company.api";
import { useEffect } from "react";
import SearchBar from "../../../common/components/search-bar/search-bar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import WrapperHeader from "../../../common/components/wrapper-header/wrapper-header";
import IconButton from "../../../common/components/icon-button/icon-button.component";
import CreateCompanyModal from "../create-company-modal/create-company-modal";
import Paginator from "../../../common/components/paginator/paginator";
import { setPaginatorResults } from "../../../common/features/paginator.slice";
import { setSearchBarFocus } from "../../../common/features/search-bar.slice";
import CompanyListItem from "../company-list-item/company-list-item";
import { setCompanies, setShowCreateCompanyModal } from "../../features/company.slice";
import PageTitle from "../../../common/components/page-title/page-title";
import CardList from "../../../common/components/card-list/card-list";

export default function CompanyListIndex() {

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
            <WrapperHeader>
                <PageTitle value="Companies" />
            </WrapperHeader>
            <WrapperHeader sticky>
                <Row className="g-0">
                    <Col xs={10} md={11}>
                        <SearchBar
                            withPaginator
                            placeholder="Search Company"
                        />
                    </Col>
                    <Col xs={2} md={1}>
                        <IconButton
                            tooltip={"Create Company"}
                            icon="bi bi-plus-circle"
                            onClick={showCreateCompanyModalOnClick} />
                    </Col>
                </Row>
            </WrapperHeader>
            <WrapperPage show={isSuccess} backToTopOnClick={backToTopOnClick} >
                <Row className="mb-3">
                    <Col xs={12}>
                        <CardList>
                            {companies.map((company, index) => (
                                <CompanyListItem company={company} key={index} />
                            ))}
                        </CardList>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Paginator withSearchBar />
                    </Col>
                </Row>
                <CreateCompanyModal />
            </WrapperPage>
        </>
    );
}
