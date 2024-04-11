import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"
import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum"
import { useTranslation } from "react-i18next"

type ProfileTfaInfoProps = {
    user: User
}
export default function ProfileTfaInfo({ user }: ProfileTfaInfoProps) {
    const { t } = useTranslation("profile", { keyPrefix: "tfa_info" });
    const tfaEmailElement: JSX.Element = (
        <>
            <span>{t("email.value")}</span>
            {user.tfaType === TfaType.EMAIL &&
                <Badge className="ms-3" bg="success">
                    {t("configured")}
                </Badge>
            }
        </>
    );

    const handleEnableTfa = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-shield-check me-3"></i>
                    {t("title")}
                </Card.Title>
                <p>
                    {t("subtitle")}
                </p>
                <ListGroup variant="flush">
                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("email.label")}
                        value={tfaEmailElement}
                        onClick={handleEnableTfa}
                    />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}