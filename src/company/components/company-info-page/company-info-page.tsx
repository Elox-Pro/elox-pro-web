import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CompanyBasicInfoCard from "../company-basic-info-card/company-basic-info-card";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useGetCompanyQuery } from "../../api/company.api";
import { useEffect } from "react";
import { setCompany, setCompanyUsers, setTotalCompanyUsers } from "../../features/company.slice";
import { useParams } from "react-router-dom";
import EditCompanyNameModal from "../edit-company-name-modal/edit-company-name-modal.";

export function CompanyInfoPage() {

    const params = useParams<CompanyInfoPageParams>();
    const { showEditCompanyNameModal: showEditCompanyModal } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();
    const { data, isSuccess } = useGetCompanyQuery({
        id: params && params.id ? parseInt(params.id) : 0
    });

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCompany(data.company));
            dispatch(setCompanyUsers(data.users));
            dispatch(setTotalCompanyUsers(data.totalUsers));
        }
    }, [data, isSuccess]);


    return (
        <CPWrapperPage show={isSuccess}>
            <Row className="text-center">
                <Col xs={12}>
                    <p className="fs-1">Company Info</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <CompanyBasicInfoCard />
                </Col>
            </Row>
            {<EditCompanyNameModal />}
        </CPWrapperPage>
    )
}