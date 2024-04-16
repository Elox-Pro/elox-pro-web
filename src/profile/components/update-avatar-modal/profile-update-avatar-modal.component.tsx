import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import Row from "react-bootstrap/esm/Row"
import "./profile-update-avatar-modal.style.scss"
import { useEffect, useState } from "react"
import { ModalHeader } from "../../../common/components/modal/modal-header/modal-header.component"
import { useUpdateAvatarMutation } from "../../api/profile.api"
import AlertError, { AlertErrorPros } from "../../../common/components/alert-error/alert-error.component"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setProfile, setProfileToast } from "../../features/profile.slice"
import { useGetAvatarsQuery } from "../../../avatars/api/avatar.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import { useTranslation } from "react-i18next"

type ProfileUpdateAvatarModalProps = {
    show: boolean,
    onHide: () => void
}
export default function ProfileUpdateAvatarModal({ show, onHide }: ProfileUpdateAvatarModalProps) {
    const { t } = useTranslation("profile", { keyPrefix: "update_avatar" });
    const { profile } = useAppSelector(state => state.profile);
    const [alertError, setAlertError] = useState<AlertErrorPros>();
    const [updateAvatar, { data, status, error, isLoading }] = useUpdateAvatarMutation();
    const [selectedAvatar, setSelectedAvatar] = useState<string>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedAvatar(profile.avatarUrl);
    }, [profile])

    const handleOnSelectAvatar = (avatar: string) => {
        setSelectedAvatar(avatar);
    }

    const handleOnHide = () => {
        setSelectedAvatar(profile.avatarUrl);
        setAlertError(undefined);
        onHide();
    }

    const handleOnSubmit = () => {
        try {
            if (profile.avatarUrl === selectedAvatar) {
                return;
            }
            if (!selectedAvatar) {
                return;
            }
            updateAvatar({ avatarUrl: selectedAvatar });
        } catch (error) {
            console.error("Update Avatar Error:", error)
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data.OK) {
            onHide();
            setAlertError(undefined);
            dispatch(setProfileToast({
                title: t("success_toast.title"),
                message: t("success_toast.message"),
                show: true
            }));

            dispatch(setProfile({ ...profile, avatarUrl: selectedAvatar }));

        } else if (status === QueryStatus.rejected) {
            setAlertError({ status, error });
        }
    }, [status, error, data])

    return (

        <Modal className="profile-update-avatar-modal" show={show} fullscreen="lg-down" scrollable backdrop="static" keyboard={false}>

            <ModalHeader
                title={t("modal.title")}
                buttonText={t("modal.submit")}
                onHide={handleOnHide}
                onSubmit={handleOnSubmit}
            />
            <Modal.Body className="p-0 pb-5">
                <div className="bg-tertiary sticky-top mb-2">
                    <img src={selectedAvatar} width={128} className="mx-auto my-0 py-3 d-flex rounded-circle" />
                </div>
                <Container>
                    <AlertError status={alertError?.status} error={alertError?.error} />
                    <p className="text-muted">{t("modal.label")}</p>
                    <AvatarList selectedAvatar={selectedAvatar} handleOnSelectAvatar={handleOnSelectAvatar} />
                </Container>
            </Modal.Body>
        </Modal >

    )
}

type AvatarListProps = {
    selectedAvatar: string | undefined,
    handleOnSelectAvatar: (url: string) => void;
}
function AvatarList({ selectedAvatar, handleOnSelectAvatar }: AvatarListProps) {
    const { data, error, isLoading, status } = useGetAvatarsQuery();
    return (
        <CPWrapperPage loading={isLoading} error={error} status={status}>
            {status === QueryStatus.fulfilled &&
                <Row className="g-0">
                    {data?.avatars.map((avatar, index) => (
                        <Col key={index} xs={3} className="p-2">
                            <button
                                className={`${selectedAvatar === avatar.url ? 'active' : ''} btn btn-avatar`}
                                onClick={() => {
                                    handleOnSelectAvatar(avatar.url)
                                }}>
                                <img src={avatar.url} width={96} className="w-100" alt="avatar" />
                            </button>
                        </Col>
                    ))}
                </Row>}
        </CPWrapperPage>
    )
}