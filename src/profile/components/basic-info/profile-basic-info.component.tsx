import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component";
import { User } from "../../../users/types/user.type";
import { DEFAULT_AVATAR_URL } from "../../constants/profile.constants";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "../../../common/constants/common.constants";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProfileChangeAvatarModal from "../change-avatar-modal/profile-change-avatar-modal.component";

type ProfileBasicInfoProps = {
    user: User
    userT: Record<string, string>
}
export default function ProfileBasicInfo({ user, userT }: ProfileBasicInfoProps) {

    const { t } = useTranslation("profile", { keyPrefix: "basic_info" })
    const avatar = user.avatarUrl || DEFAULT_AVATAR_URL
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`

    const updatedAt = user.updatedAt ? new Date(user.updatedAt).toLocaleString(
        DEFAULT_LOCALE, DEFAULT_DATE_FORMAT
    ) : "N/A";

    const [show, setShow] = useState(false);

    const handleChangeAvatar = () => {
        setShow(true);
    }


    const handleChangeName = () => {
        alert("Not implemented")
    }

    const handleChangeGender = () => {
        alert("Not implemented")
    }

    return (

        <>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <i className="bi bi-person-circle me-3"></i>
                        {t("title")}
                    </Card.Title>
                    <ListGroup variant="flush">

                        <ListGroupItem
                            type={ListGroupItemType.AVATAR}
                            label={t("avatar.label")}
                            value={t("avatar.value")}
                            imageUrl={avatar}
                            onClick={handleChangeAvatar}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("username.label")}
                            value={user.username}
                            hidden />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("role.label")}
                            value={userT[user.role]}
                            hidden />


                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("name.label")}
                            value={fullName}
                            onClick={handleChangeName}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("gender.label")}
                            value={userT[user.gender] || "N/A"}
                            onClick={handleChangeGender}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("updated_at.label")}
                            value={updatedAt}
                            hidden />

                    </ListGroup>
                </Card.Body>
            </Card>

            <ProfileChangeAvatarModal userAvatar={avatar} show={show} onHide={() => setShow(false)} />

        </>
    )
}