
import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import "./profile-update-avatar-modal.style.scss"
import { useEffect } from "react"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component"
import { useUpdateAvatarMutation } from "../../api/profile.api"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useTranslation } from "react-i18next"
import AvatarList from "../../../avatar/components/avatar-list/avatar-list"
import { toast } from "react-toastify"
import { setActiveUser } from "../../../auth/features/auth.slice"
import { useActiveUser } from "../../../auth/hooks/active-user.hook"
import { setOverlay } from "../../../common/features/common.slice"

type ProfileUpdateAvatarModalProps = {
    show: boolean,
    onHide: () => void
}
export default function ProfileUpdateAvatarModal({ show, onHide }: ProfileUpdateAvatarModalProps) {
    const { t } = useTranslation("profile", { keyPrefix: "update-avatar" });
    const { profile } = useAppSelector(state => state.profile);
    const { overlay } = useAppSelector(state => state.common);
    const activeUser = useActiveUser();
    const dispatch = useAppDispatch();

    if (profile === null) {
        return null;
    }

    const { selectedAvatar } = useAppSelector(state => state.avatar);
    const [mutation, { data, status }] = useUpdateAvatarMutation();

    const onSubmit = async () => {
        try {
            if (selectedAvatar && selectedAvatar.url !== profile.avatarUrl) {
                dispatch(setOverlay(true));
                mutation({ avatarUrl: selectedAvatar.url });
            }
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            if (selectedAvatar !== null) {
                dispatch(setActiveUser({ ...activeUser, avatarUrl: selectedAvatar.url }));
            }
            onHide();
            toast.success(t("success.on-fullfilled"));
        }
    }, [status, data])


    return (

        <Modal className="profile-update-avatar-modal" show={show} fullscreen="lg-down" scrollable backdrop="static" keyboard={false}>

            <ModalHeader
                title={t("modal.title")}
                buttonText={t("modal.submit")}
                onHide={onHide}
                onSubmit={onSubmit}
                disabled={overlay.active}
            />
            <Modal.Body className="p-0 pb-5">
                <div className="bg-body-tertiary sticky-top mb-2">
                    <img src={selectedAvatar?.url} width={128} className="mx-auto my-0 py-3 d-flex rounded-circle" />
                </div>
                <Container>
                    <p className="text-muted">{t("modal.label")}</p>
                    <AvatarList />
                </Container>
            </Modal.Body>
        </Modal >
    )
}