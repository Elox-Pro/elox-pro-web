import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CompanyBasicInfoCard from "../company-basic-info-card/company-basic-info-card";
import WrapperPage from "../../../common/components/wrapper-page/wrapper-page";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useGetCompanyQuery } from "../../api/company.api";
import { useEffect } from "react";
import { setCompany, setCompanyUsers, setTotalCompanyUsers } from "../../features/company.slice";
import { useParams } from "react-router-dom";
import EditCompanyNameModal from "../edit-company-name-modal/edit-company-name-modal";
import CompanyNameItem from "../company-name-item/company-name-item";
import CompanyUpdateAtItem from "../company-update-at-item/company-update-at-item";
import CardList from "../../../common/components/card-list/card-list";
import { IconType } from "../../../common/enums/icon-type.enum";
import CompanyUserItem from "../company-user-item/company-user-item";
import { ManageCompanyUserModal } from "../manage-company-user-modal/manage-company-user-modal";
import AddUserToCompanyItem from "../add-user-to-company-item/add-user-to-company-item";
import DeleteCompanyItem from "../delete-company-item/delete-company-item";
import SelectUserModal from "../../../users/components/select-user-modal/select-user-modal.component";
import ShowMoreCompanyUsersItem from "../show-more-company-users-item/show-more-company-users-item";
import TotalCompanyUsersItem from "../total-company-users-item/total-company-users-item";
import PageTitle from "../../../common/components/page-title/page-title";
import PageImage from "../../../common/components/page-image/page-image";
import PageDescription from "../../../common/components/page-description/page-description";


export function CompanyInfoIndex() {

    const params = useParams<CompanyInfoIndexParams>();
    const { company, companyUsers } = useAppSelector((state) => state.company);
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

    const companyName = company?.name || "";
    const companyImage = company?.imageUrl || "";

    return (
        <WrapperPage show={isSuccess}>
            <PageImage src={companyImage} alt={companyName} />
            <PageTitle value={companyName} />
            <PageDescription text="Company Info" />
            <Row>
                <Col xs={12}>
                    <CardList icon={IconType.FileCheck} title="Basic Info">
                        <CompanyNameItem />
                        <CompanyUpdateAtItem />
                    </CardList>
                </Col>
                {companyUsers.length > 0 &&
                    <Col xs={12}>
                        <CardList icon={IconType.People} title="Users">
                            {companyUsers.map((user, index) => (
                                <CompanyUserItem
                                    key={index}
                                    user={user}
                                />
                            ))}
                            <ShowMoreCompanyUsersItem />
                            <TotalCompanyUsersItem />
                        </CardList>
                    </Col>
                }
                <Col xs={12}>
                    <CardList icon={IconType.Gear} title="Manage Company">
                        <AddUserToCompanyItem />
                        <DeleteCompanyItem />
                    </CardList>
                </Col>
            </Row>
            <EditCompanyNameModal />
            <ManageCompanyUserModal />
            <SelectUserModal />
        </WrapperPage>
    )
}