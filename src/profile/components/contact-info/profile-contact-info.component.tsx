import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"

export default function ProfileContactInfo() {
    const { profile } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "contact_info" });

    const handleChangeEmail = () => { alert("change email") };
    const handleChangePhone = () => { alert("change phone") };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-person-badge me-3"></i>
                    {t("title")}
                </Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("email.label")}
                        value={<Verified
                            value={profile.email}
                            verified={profile.emailVerified}
                            text={t("verified")}
                        />}
                        onClick={handleChangeEmail}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("phone.label")}
                        value={<Verified
                            value={profile.phone}
                            verified={profile.phoneVerified}
                            text={t("verified")}
                        />}
                        onClick={handleChangePhone}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )
}

type VerifiedProps = {
    value: string | undefined
    verified: boolean | undefined
    text: string
}

function Verified({ value, verified, text }: VerifiedProps) {
    return (
        <>
            <span className="me-3">{value || "N/A"}</span>
            {verified && <Badge bg="success">{text}</Badge>}
        </>
    );
}