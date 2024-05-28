import { ReactNode } from "react";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import "./modal-action.styles.scss";

type WrapperProps = {
    show: boolean;
    children: ReactNode;
}

const Wrapper = ({ show, children }: WrapperProps) => {
    return (
        <Modal
            className="modal-action modal-action-wrapper"
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            {children}
        </Modal >
    );
}

const Header = () => {
    return (
        <div className="modal-header px-0">
            <Container fluid>
                <Row className="g-0 align-items-center text-center">
                    <Col xs={2}>
                        <button
                            type="button"
                            className="btn btn-back">
                            ‹
                        </button>
                    </Col>
                    <Col xs={8}>
                        <h1 className="modal-title fs-5">Actions</h1>
                    </Col>
                    <Col xs={2}>
                        <button
                            type="button"
                            className="btn btn-close ms-0">
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

type BodyProps = {
    children: ReactNode;
}

const Body = ({ children }: BodyProps) => {
    return (
        <Modal.Body className="p-0 pb-5">
            {children}
        </Modal.Body>
    );
}

const Item = () => { }

const ModalAction = {
    Wrapper,
    Header,
    Body,
    Item
};

export default ModalAction;