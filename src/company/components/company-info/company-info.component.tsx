import { useTranslation } from "react-i18next";
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

type Params = {
    id: string;
}
export default function CompanyInfo() {
    const { t } = useTranslation("company", { keyPrefix: "info" });
    const { id } = useParams<Params>();

    if (!id || isNaN(parseInt(id))) {
        return null;
    }

    const { data, isSuccess } = useGetCompanyQuery({
        id: parseInt(id)
    });

    if (!isSuccess || !data) {
        return null;
    }

    return (
        <CPWrapperPage show={isSuccess} >
            <Header />
            <CompanySection company={data.company} />
            <UsersSection users={data.users} totalUsers={data.totalUsers} />
            <CustomersSection customers={data.customers} totalCustomers={data.totalCustomers} />
            <ManageCompanySection />
            <BackToTopButton />
        </CPWrapperPage>
    )
}

function Header() {
    const { t } = useTranslation("company", { keyPrefix: "info" });
    return (
        <Row className="text-center">
            <Col xs={12}>
                <p className="fs-1 mb-0">{t("title")}</p>
                <p>{t("subtitle")}</p>
            </Col>
        </Row>
    )
}

type CompanySectionProps = {
    company: Company;
}
function CompanySection({ company }: CompanySectionProps) {
    return (
        <Row className="mb-3">
            <Col xs={12}>
                <CardListGroup.Container>
                    <CardListGroup.IconTitle value={"Basic Info"} />
                    <CardListGroup.Body>
                        <CompanyPictureItem
                            company={company} />
                        <CompanyNameItem
                            company={company}
                            onClick={() => alert(1)} />
                        <CompanyUpdateAtItem
                            company={company} />
                    </CardListGroup.Body>
                </CardListGroup.Container>
            </Col>
        </Row>
    )
}

type UsersSectionProps = {
    users: User[];
    totalUsers: number;
}
function UsersSection({ users, totalUsers }: UsersSectionProps) {
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

type CustomersSectionProps = {
    customers: User[];
    totalCustomers: number;
}
function CustomersSection({ customers, totalCustomers }: CustomersSectionProps) {
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
                        <ListGroupItem.Container onClick={() => alert("delete company")}>
                            <ListGroupItem.Body>
                                <ListGroupItem.BodyIcon
                                    iconClass="bi bi-trash text-danger" />
                                <ListGroupItem.BodySection>
                                    <p className="mb-0 text-muted">
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

type CompanyItemProps = {
    company: Company;
    onClick?: () => void;
}
function CompanyPictureItem({ company }: CompanyItemProps) {
    return (
        <ListGroupItem.Container>
            <ListGroupItem.Body>
                <ListGroupItem.BodyLabel value="Company picture" />
                <ListGroupItem.BodyValue value="A company picture helps personalize your account" />
            </ListGroupItem.Body>
            <ListGroupItem.ImageCol
                src={company.imageUrl}
                alt={company.name}
            />
        </ListGroupItem.Container>
    )
}

function CompanyNameItem({ company, onClick }: CompanyItemProps) {
    return (
        <ListGroupItem.Container onClick={onClick}>
            <ListGroupItem.Body>
                <ListGroupItem.BodyLabel value="Company Name" />
                <ListGroupItem.BodyValue value={company.name} />
            </ListGroupItem.Body>
            <ListGroupItem.ChevronIcon />
        </ListGroupItem.Container>
    )
}

function CompanyUpdateAtItem({ company }: CompanyItemProps) {
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