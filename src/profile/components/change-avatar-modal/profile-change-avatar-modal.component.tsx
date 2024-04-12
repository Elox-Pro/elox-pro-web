import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import Row from "react-bootstrap/esm/Row"
import "./profile-change-avatar-modal.style.scss"
import { useState } from "react"
import { ModalHeader } from "../../../common/components/modal/modal-header/modal-header.component"

type ProfileChangeAvatarModalProps = {
    userAvatar: string
    show: boolean,
    onHide: () => void
}
export default function ProfileChangeAvatarModal({ userAvatar, show, onHide }: ProfileChangeAvatarModalProps) {

    const [avatar, setAvatar] = useState(userAvatar);

    const handleSelectAvatar = (avatar: string) => {
        setAvatar(avatar);
    }

    const handleOnHide = () => {
        setAvatar(userAvatar);
        onHide();
    }

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
                onSubmit={() => { alert("Not implemented") }}
            />
            <Modal.Body className="p-0 pb-5">
                <div className="bg-tertiary sticky-top mb-2">
                    <img src={avatar} width={128} className="mx-auto my-0 py-3 d-flex rounded-circle" />
                </div>
                <Container>
                    <p className="text-muted">Select a picture</p>
                    <Row className="g-0">
                        {avatars.map((av, index) => (
                            <Col key={index} xs={3} className="p-2">
                                <button className={`${avatar === av ? 'active' : ''} btn btn-avatar`} onClick={() => {
                                    handleSelectAvatar(av)
                                }}>
                                    <img src={av} width={96} className="w-100" alt="avatar" />
                                </button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>

    )
}