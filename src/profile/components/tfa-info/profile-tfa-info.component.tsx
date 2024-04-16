import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"
import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"

export default function ProfileTfaInfo() {
    const { t } = useTranslation("profile", { keyPrefix: "tfa_info" });
    const { profile } = useAppSelector(state => state.profile);

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
                <p>{t("subtitle")}</p>
                <ListGroup variant="flush">
                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("email.label")}
                        value={<TfaEmail
                            value={t("email.value")}
                            type={profile.tfaType}
                            text={t("configured")}
                        />}
                        onClick={handleEnableTfa}
                    />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

type TfaEmailProps = {
    value: string
    type: TfaType | undefined
    text: string
}

function TfaEmail({ value, type, text }: TfaEmailProps) {
    return (
        <>
            <span>{value}</span>
            {type === TfaType.EMAIL && <Badge className="ms-3" bg="success">{text}</Badge>}
        </>
    )
}