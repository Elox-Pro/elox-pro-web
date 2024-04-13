import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import Row from "react-bootstrap/esm/Row"
import "./profile-change-avatar-modal.style.scss"
import { useEffect, useState } from "react"
import { ModalHeader } from "../../../common/components/modal/modal-header/modal-header.component"
import { useUpdateAvatarMutation } from "../../api/profile.api"
import AlertError, { AlertErrorPros } from "../../../common/components/alert-error/alert-error.component"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { setProfileToast } from "../../features/profile.slice"

type ProfileChangeAvatarModalProps = {
    userAvatar: string
    show: boolean,
    onHide: () => void
}
export default function ProfileChangeAvatarModal({ userAvatar, show, onHide }: ProfileChangeAvatarModalProps) {
    const [selectedAvatar, setSelectedAvatar] = useState(userAvatar);
    const [alertError, setAlertError] = useState<AlertErrorPros>();
    const [updateAvatar, { data, status, error }] = useUpdateAvatarMutation();
    const dispatch = useAppDispatch();

    const handleOnSelectAvatar = (avatar: string) => {
        setSelectedAvatar(avatar);
    }

    const handleOnHide = () => {
        setSelectedAvatar(userAvatar);
        setAlertError(undefined);
        onHide();
    }


    const handleOnSubmit = () => {
        try {
            if (userAvatar === selectedAvatar) {
                return;
            }
            updateAvatar({ avatarUrl: selectedAvatar });
        } catch (error) {
            console.error("Update Avatar Error:", error)
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data.OK) {
            handleOnHide();
            dispatch(setProfileToast({
                title: "success",
                message: "avatar updated",
                show: true
            }))

        } else if (status === QueryStatus.rejected) {
            setAlertError({ status, error });
        }
    }, [status, error, data])

    const avatars = [
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sophie",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Oliver",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Cleo",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Bubba",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Jasmine",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Smokey",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Snuggles",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Mittens",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Gracie",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Bear",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Cuddles",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Miss%20kitty",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Kiki",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sammy",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Peanut",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Precious",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Baby",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Snowball",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Scooter",
        "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Simon"
    ];

    return (
        <Modal className="profile-change-avatar-modal" show={show} fullscreen="lg-down" scrollable backdrop="static" keyboard={false}>
            <ModalHeader
                title="Edit avatar"
                buttonText="OK"
                onHide={handleOnHide}
                onSubmit={handleOnSubmit}
            />
            <Modal.Body className="p-0 pb-5">
                <div className="bg-tertiary sticky-top mb-2">
                    <img src={selectedAvatar} width={128} className="mx-auto my-0 py-3 d-flex rounded-circle" />
                </div>
                <Container>
                    <AlertError status={alertError?.status} error={alertError?.error} />
                    <p className="text-muted">Select a picture</p>
                    <Row className="g-0">
                        {avatars.map((avatar, index) => (
                            <Col key={index} xs={3} className="p-2">
                                <button
                                    className={`${selectedAvatar === avatar ? 'active' : ''} btn btn-avatar`}
                                    onClick={() => {
                                        handleOnSelectAvatar(avatar)
                                    }}>
                                    <img src={avatar} width={96} className="w-100" alt="avatar" />
                                </button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}