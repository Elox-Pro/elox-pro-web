
import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import "./profile-update-avatar-modal.style.scss"
import { useEffect, useState } from "react"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component"
import { useUpdateAvatarMutation } from "../../api/profile.api"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useTranslation } from "react-i18next"
import AvatarList from "../../../avatar/components/avatar-list/avatar-list"
import { setOverlay } from "../../../common/features/common.slice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { handleRejected } from "../../../common/helpers/handle-rejected.helper"

type ProfileUpdateAvatarModalProps = {
    show: boolean,
    onHide: () => void
}
export default function ProfileUpdateAvatarModal({ show, onHide }: ProfileUpdateAvatarModalProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("profile", { keyPrefix: "update-avatar" });
    const { profile } = useAppSelector(state => state.profile);

    if (profile === null) {
        return null;
    }

    const { selectedAvatar } = useAppSelector(state => state.avatar);
    const [disabled, setDisabled] = useState(false);
    const [updateAvatar, { data, status, error }] = useUpdateAvatarMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async () => {
        try {
            if (selectedAvatar === null ||
                selectedAvatar.url === profile.avatarUrl) {
                return;
            }
            onInitRequest();
            updateAvatar({ avatarUrl: selectedAvatar.url });
        } catch (error) {
            onErrorRequest(error);
        }
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled: onFulfilled(); break;
            case QueryStatus.rejected: onRejected(); break;
        }
    }, [status, error, data])

    const onInitRequest = () => {
        dispatch(setOverlay(true));
        setDisabled(true);
    }

    const onErrorRequest = (error: any) => {
        dispatch(setOverlay(false));
        setDisabled(false);
        toast.error(t("error.on-request"));
        console.error("Update Avatar Error:", error);
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Update Avatar Rejected", navigate });
    }

    const onFulfilled = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        onHide();
        toast.success(t("success.on-fullfilled"));
    }

    return (

        <Modal className="profile-update-avatar-modal" show={show} fullscreen="lg-down" scrollable backdrop="static" keyboard={false}>

            <ModalHeader
                title={t("modal.title")}
                buttonText={t("modal.submit")}
                onHide={onHide}
                onSubmit={onSubmit}
                disabled={disabled}
            />
            <Modal.Body className="p-0 pb-5">
                <div className="bg-tertiary sticky-top mb-2">
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