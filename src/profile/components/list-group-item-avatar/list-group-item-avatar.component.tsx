import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/esm/ListGroup"
import Row from "react-bootstrap/esm/Row"
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getProfileAvatar } from "../../helpers/get-profile-avatar";
import { useDispatch } from "react-redux";
import { setSelectedAvatar } from "../../../avatar/features/avatar.slice";
import { useState } from "react";
import ProfileUpdateAvatarModal from "../update-avatar-modal/profile-update-avatar-modal.component";

export default function ListGroupItemAvatar() {
    const { t } = useTranslation("profile", { keyPrefix: "basic-info.avatar" });
    const { profile } = useAppSelector(state => state.profile);
    const dispatch = useDispatch();
    const avatar = getProfileAvatar(profile.avatarUrl);
    const [showModal, setShowModal] = useState(false);

    const onClick = () => {
        dispatch(setSelectedAvatar({ url: avatar }));
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    return (
        <>
            <ListGroup.Item className="px-0 py-3" action onClick={onClick}>
                <Row className="w-100 align-items-center g-0">
                    <Col xs={9}>
                        <Row className="w-100 align-items-center g-0">
                            <Col xs={12} md={4}>
                                <p className="mb-0 text-muted">
                                    {t("label")}
                                </p>
                            </Col>
                            <Col xs={12} md={8}>
                                <p className="mb-0">
                                    {t("value")}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <figure className="figure mb-0 text-center">
                            <img width={48}
                                className="rounded-circle"
                                src={avatar}
                                alt="avatar" />
                        </figure>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ProfileUpdateAvatarModal show={showModal} onHide={onHide} />
        </>

    )
}