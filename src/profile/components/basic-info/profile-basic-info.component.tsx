import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component";
import { User } from "../../../users/types/user.type";
import { DEFAULT_AVATAR_URL } from "../../constants/profile.constants";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "../../../common/constants/common.constants";
import { useTranslation } from "react-i18next";

type ProfileBasicInfoProps = {
    user: User
}
export default function ProfileBasicInfo({ user }: ProfileBasicInfoProps) {
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
                        label="Role"
                        value={user.role}
                        hidden />


                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Name"
                        value={fullName}
                        hidden />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Gender"
                        value={user.gender || "N/A"}
                        hidden />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Updated at"
                        value={updatedAt}
                        hidden />


                    <ListGroupItem
                        type={ListGroupItemType.EXTRA_ACTION}
                        label="More options"
                        text="Edit"
                        icon="bi bi-pencil-square"
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )
}