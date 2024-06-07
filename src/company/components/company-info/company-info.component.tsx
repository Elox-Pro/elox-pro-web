import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import { useGetCompanyQuery } from "../../api/company.api";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import CardListGroup from "../../../common/components/card-list-group/card-list-group.component";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";
import { getFormatDate } from "../../../common/helpers/get-format-date";
import { User } from "../../../users/types/user.type";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import { Company } from "../../types/company.type";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setCompany, setCustomers, setTotalCustomers, setTotalUsers, setUsers } from "../../features/company-info.slice";
import companyUpdateNameReducer, { setShowModal } from "../../features/company-update-name.slice";
import CompanyUpdateNameModal from "../company-update-name-modal/company-update-name-modal.component";

type Params = {
    id: string;
}
export default function CompanyInfo() {
    const params = useParams<Params>();
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetCompanyQuery({
        id: params && params.id ? parseInt(params.id) : 0
    });

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCompany(data.company));
            dispatch(setUsers(data.users));
            dispatch(setCustomers(data.customers));
            dispatch(setTotalUsers(data.totalUsers));
            dispatch(setTotalCustomers(data.totalCustomers));
        }
    }, [data, isSuccess]);

    return (
        <CPWrapperPage show={isSuccess} >
            <Header />
            <CompanySection />
            <UsersSection />
            <CustomersSection />
            <ManageCompanySection />
            <BackToTopButton />
        </CPWrapperPage>
    )
}

function Header() {
    return (
        <Row className="text-center">
            <Col xs={12}>
                <p className="fs-1 mb-0">
                    Company Info
                </p>
                <p>Info About the company</p>
            </Col>
        </Row>
    )
}

function CompanySection() {
    const company = useAppSelector((state) => state.companyInfo.company);
    if (!company) {
        return null;
    }
    return (
        <Row className="mb-3">
            <Col xs={12}>
                <CardListGroup.Container>
                    <CardListGroup.IconTitle value={"Basic Info"} />
                    <CardListGroup.Body>
                        <CompanyNameItem />
                        <CompanyUpdateAtItem />
                    </CardListGroup.Body>
                </CardListGroup.Container>
            </Col>
        </Row>
    )
}

function UsersSection() {
    const {
        users,
        totalUsers,
    } = useAppSelector((state) => state.companyInfo);

    if (users.length === 0) {
        return null;
    }
    return (
        <Row className="mb-3">
            <Col xs={12}>
                <CardListGroup.Container>
                    <CardListGroup.IconTitle
                        value={"Users"}
                        iconClass="bi bi-people"
                    />
                    <CardListGroup.Body>
                        {users.map((user, index) => (
                            <CompanyUserItem
                                key={index}
                                user={user}
                                onClick={() => alert("options: show user info, remove user from company (not system)")}
                            />
                        ))}
                        <ShowMoreItem onClick={() => alert("show more users")} />
                        <CompanyTotalItem
                            value="Total Users"
                            total={totalUsers} />
                    </CardListGroup.Body>
                </CardListGroup.Container>
            </Col>
        </Row>
    )
}

function CustomersSection() {

    const {
        customers,
        totalCustomers,
    } = useAppSelector((state) => state.companyInfo);

    if (customers.length === 0) {
        return null;
    }

    return (
        <Row className="mb-3">
            <Col xs={12}>
                <CardListGroup.Container>
                    <CardListGroup.IconTitle
                        value={"Customers"}
                        iconClass="bi bi-people"
                    />
                    <CardListGroup.Body>
                        {customers.map((user, index) => (
                            <CompanyUserItem
                                key={index}
                                user={user}
                                onClick={() => alert("show customer info")}
                            />
                        ))}
                        <ShowMoreItem onClick={() => alert("show more users")} />
                        <CompanyTotalItem
                            value="Total Customers"
                            total={totalCustomers} />
                    </CardListGroup.Body>
                </CardListGroup.Container>
            </Col>
        </Row>
    )
}

function ManageCompanySection() {
    return (
        <Row className="mb-3">
            <Col xs={12}>
                <CardListGroup.Container>
                    <CardListGroup.IconTitle
                        value={"Manage Company"}
                        iconClass="bi bi-gear"
                    />
                    <CardListGroup.Body>

                        <ListGroupItem.Container onClick={() => alert("Add user to company")}>
                            <ListGroupItem.Body>
                                <ListGroupItem.BodyIcon
                                    iconClass="bi bi-plus-circle text-info" />
                                <ListGroupItem.BodySection>
                                    <p className="mb-0">
                                        Add user to company
                                    </p>
                                </ListGroupItem.BodySection>
                            </ListGroupItem.Body>
                            <ListGroupItem.ChevronIcon />
                        </ListGroupItem.Container>

                        <ListGroupItem.Container onClick={() => alert("remove user from company")}>
                            <ListGroupItem.Body>
                                <ListGroupItem.BodyIcon
                                    iconClass="bi bi-trash text-danger" />
                                <ListGroupItem.BodySection>
                                    <p className="mb-0">
                                        Remove user from company
                                    </p>
                                </ListGroupItem.BodySection>
                            </ListGroupItem.Body>
                            <ListGroupItem.ChevronIcon />
                        </ListGroupItem.Container>

                        <ListGroupItem.Container onClick={() => alert("delete company")}>
                            <ListGroupItem.Body>
                                <ListGroupItem.BodyIcon
                                    iconClass="bi bi-trash text-danger" />
                                <ListGroupItem.BodySection>
                                    <p className="mb-0">
                                        Delete company
                                    </p>
                                </ListGroupItem.BodySection>
                            </ListGroupItem.Body>
                            <ListGroupItem.ChevronIcon />
                        </ListGroupItem.Container>

                    </CardListGroup.Body>
                </CardListGroup.Container>
            </Col>
        </Row>
    )
}


function CompanyNameItem() {
    const company = useAppSelector((state) => state.companyInfo.company);
    const dispatch = useAppDispatch();
    if (!company) {
        return null;
    }
    const onClick = () => {
        dispatch(setShowModal(true));
    }
    return (
        <>
            <ListGroupItem.Container onClick={onClick}>
                <ListGroupItem.Body>
                    <ListGroupItem.BodyLabel value="Company Name" />
                    <ListGroupItem.BodySection col={8} >
                        <p className="mb-0">
                            <img src={company.imageUrl} alt={company.name} width={24} />
                            <span className="ms-3">{company.name}</span>
                        </p>
                    </ListGroupItem.BodySection>
                </ListGroupItem.Body>
                <ListGroupItem.ChevronIcon />
            </ListGroupItem.Container>
            <CompanyUpdateNameModal />
        </>
    )
}

function CompanyUpdateAtItem() {
    const company = useAppSelector((state) => state.companyInfo.company);
    if (!company) {
        return null;
    }
    const formatDate = getFormatDate(company.updatedAt);
    return (
        <ListGroupItem.Container>
            <ListGroupItem.Body>
                <ListGroupItem.BodyLabel value="Updated at" />
                <ListGroupItem.BodyValue value={formatDate} />
            </ListGroupItem.Body>
        </ListGroupItem.Container>
    )
}

type CompanyUserItemProps = {
    user: User | null;
    onClick: () => void;
}

function CompanyUserItem({ user, onClick }: CompanyUserItemProps) {

    if (user === null) {
        return null;
    }

    const avatar = getProfileAvatar(user.avatarUrl);
    return (
        <ListGroupItem.Container onClick={onClick}>
            <ListGroupItem.Body>
                <ListGroupItem.BodyImage
                    src={avatar}
                    alt={user.username || ""} />
                <ListGroupItem.BodySection>
                    <p className="mb-0 text-muted">
                        <span>{user.username}</span>&nbsp;
                        <small>({user.roleText})</small>
                    </p>
                </ListGroupItem.BodySection>
            </ListGroupItem.Body>
            <ListGroupItem.ChevronIcon />
        </ListGroupItem.Container>
    )
}

type CompanyTotalItemProps = {
    value: string;
    total: number;
}
function CompanyTotalItem({ value, total }: CompanyTotalItemProps) {
    return (
        <ListGroupItem.Container>
            <ListGroupItem.Body>
                <ListGroupItem.BodyLabel value={value} />
                <ListGroupItem.BodyValue value={String(total)} />
            </ListGroupItem.Body>
        </ListGroupItem.Container>
    )
}
type ShowMoreItemProps = {
    onClick: () => void;
}
function ShowMoreItem({ onClick }: ShowMoreItemProps) {
    return (
        <ListGroupItem.Container onClick={onClick}>
            <ListGroupItem.Body>
                <ListGroupItem.BodyLabel value="Show more..." />
            </ListGroupItem.Body>
            <ListGroupItem.ChevronIcon />
        </ListGroupItem.Container>
    )
}