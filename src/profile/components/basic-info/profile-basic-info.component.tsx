import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component";
import { User } from "../../../users/types/user.type";
import { DEFAULT_AVATAR_URL } from "../../constants/profile.constants";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "../../../common/constants/common.constants";
import { useTranslation } from "react-i18next";

type ProfileBasicInfoProps = {
    user: User
    userT: Record<string, string>
}
export default function ProfileBasicInfo({
    user,
    userT
}: ProfileBasicInfoProps) {
    const { t } = useTranslation(["profile"])
    const avatar = user.avatarUrl || DEFAULT_AVATAR_URL
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`

    const updatedAt = user.updatedAt ? new Date(user.updatedAt).toLocaleString(
        DEFAULT_LOCALE, DEFAULT_DATE_FORMAT
    ) : "N/A";

    const handleChangeAvatar = () => {
        alert("Not implemented")
    }
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-person-circle me-3"></i>
                    Basic info
                </Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.AVATAR}
                        label={t("basic_info_avatar_label")}
                        value={t("basic_info_avatar_value")}
                        imageUrl={avatar}
                        onClick={handleChangeAvatar}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("basic_info_username_label")}
                        value={user.username}
                        hidden />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("basic_info_role_label")}
                        value={userT[user.role]}
                        hidden />


                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("basic_info_name_label")}
                        value={fullName}
                        hidden />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("basic_info_gender_label")}
                        value={userT[user.gender] || "N/A"}
                        hidden />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("basic_info_updated_at_label")}
                        value={updatedAt}
                        hidden />


                    <ListGroupItem
                        type={ListGroupItemType.EXTRA_ACTION}
                        label={t("basic_info_more_options_label")}
                        text={t("basic_info_more_options_text")}
                        icon="bi bi-pencil-square"
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )
}