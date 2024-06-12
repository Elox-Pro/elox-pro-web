import { ReactNode, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setModalActionBackToTop } from "../../features/modal-action.slice";

type ContentProps = {
    show: boolean;
    children: ReactNode;
}

const Content = ({ show, children }: ContentProps): JSX.Element => {
    return (
        <Modal
            className="modal-form"
            show={show}
            fullscreen="md-down"
            scrollable
            backdrop="static"
            autoFocus={true}
            keyboard={false}>
            {children}
        </Modal>
    );
}

type FormProps = {
    children: ReactNode;
    onSubmit: () => void;
}
const Form = ({ children, onSubmit }: FormProps): JSX.Element => {
    return (
        <form onSubmit={onSubmit} noValidate>
            {children}
        </form>
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
    onBackToTop?: () => void;
}

const Body = ({ children, onBackToTop }: BodyProps): JSX.Element => {

    const modalRef = useRef<HTMLDivElement>(null);
    const modalAction = useAppSelector((state) => state.modalAction);
    const dispatch = useAppDispatch();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (modalRef && modalRef.current && modalRef.current.scrollTop > 150) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (modalAction.backToTop && modalRef?.current) {
            modalRef.current.scrollTop = 0;
            if (onBackToTop) {
                onBackToTop();
            }
        }
        return () => {
            dispatch(setModalActionBackToTop(false));
        }
    }, [modalAction.backToTop]);

    const scrollToTop = () => {
        dispatch(setModalActionBackToTop(true));
    };

    useEffect(() => {
        modalRef?.current?.addEventListener('scroll', toggleVisibility);
        return () => {
            modalRef?.current?.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            <div ref={modalRef} className="modal-body">
                {children}
            </div>
            <Button
                onClick={scrollToTop}
                variant="primary"
                style={{ display: isVisible ? 'block' : 'none' }}
                className="back-to-top">
                <i className="bi bi-chevron-up"></i>
            </Button>
        </>
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

const ModalAction = {
    Content,
    Form,
    Header,
    Body,
    Footer
}

export default ModalAction;