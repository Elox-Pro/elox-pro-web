import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"
import { useTranslation } from "react-i18next"

type ProfileContactInfoProps = {
    user: User
}
export default function ProfileContactInfo({ user }: ProfileContactInfoProps) {
    const { t } = useTranslation("profile", { keyPrefix: "contact_info" });
    const emailVerifiedElement: JSX.Element = (
        <>
            <span className="me-3">{user.email}</span>
            {user.emailVerified &&
                <Badge bg="success">
                    {t("verified")}
                </Badge>
            }
        </>
    );
    const handleChangeEmail = () => { alert("change email") };

    const phoneVerifiedElement: JSX.Element = (
        <>
            <span className="me-3">{user.phone || "N/A"}</span>
            {user.phoneVerified &&
                <Badge bg="success">
                    {t("verified")}
                </Badge>
            }
        </>
    );
    const handleChangePhone = () => { alert("change phone") };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-person-badge me-3"></i>
                    Contact info</Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("email.label")}
                        value={emailVerifiedElement}
                        onClick={handleChangeEmail}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("phone.label")}
                        value={phoneVerifiedElement}
                        onClick={handleChangePhone}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )

}