import { ReactNode } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";

type ContentProps = {
    show: boolean;
    children: ReactNode;
    onSubmit: () => void;
}

const Content = ({ show, onSubmit, children }: ContentProps): JSX.Element => {
    return (
        <Modal
            className="modal-form"
            show={show}
            fullscreen="md-down"
            scrollable
            backdrop="static"
            autoFocus={true}
            keyboard={false}>
            <form onSubmit={onSubmit} noValidate>
                {children}
            </form>
        </Modal>
    );
}

type HeaderProps = {
    onClose: () => void;
}

const Header = ({ onClose }: HeaderProps): JSX.Element => {
    return (
        <div className="modal-header">
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <button
                            type="button"
                            className="btn btn-close"
                            onClick={onClose}>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


type BodyProps = {
    children: ReactNode;
}

const Body = ({ children }: BodyProps): JSX.Element => {
    return (
        <Modal.Body>
            {children}
        </Modal.Body>
    );
}


type FooterProps = {
    children: ReactNode;
}
const Footer = ({ children }: FooterProps) => {
    return (
        <Modal.Footer>
            {children}
        </Modal.Footer>
    )
}

const ModalForm = {
    Content,
    Header,
    Body,
    Footer
}

export default ModalForm;