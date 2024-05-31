import { ReactNode } from "react";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";

/**
 * Props for the Form Modal component.
 * @typedef {Object} FormProps
 * @property {boolean} show - Determines if the modal is shown.
 * @property {ReactNode} children - The content to be displayed within the modal.
 * @property {() => void} onSubmit - Function to call when the submit button is clicked.
 */
type FormProps = {
    show: boolean;
    children: ReactNode;
    onSubmit: () => void;
}

/**
 * Form component for the modal.
 * @param {FormProps} props - The properties for the Modal Form component.
 * @returns {JSX.Element} The Form Modal component.
 */
const Form = ({ show, children, onSubmit }: FormProps): JSX.Element => {
    return (
        <Modal
            className="modal-action"
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            <form onSubmit={onSubmit} noValidate>
                {children}
            </form>
        </Modal>
    );
}

/**
 * Props for the Header component.
 * @typedef {Object} HeaderProps
 * @property {ReactNode} children - The content to be displayed within the header.
 * @property {() => void} onClose - Function to call when the close button is clicked.
 */
type HeaderProps = {
    children: ReactNode;
    onClose: () => void;
    tabIndex?: number;
}

/**
 * Header component for the modal.
 * @param {HeaderProps} props - The properties for the Header component.
 * @returns {JSX.Element} The Header component.
 */
const Header = ({ children, onClose, tabIndex = 0 }: HeaderProps): JSX.Element => {
    return (
        <div className="modal-header px-0">
            <Container fluid>
                <Row className="g-0 align-items-center text-center">
                    <Col xs={2}>
                        <button
                            type="button"
                            tabIndex={tabIndex + 1}
                            className="btn btn-close"
                            onClick={onClose}>
                        </button>
                    </Col>
                    <Col xs={8}>
                        {children}
                    </Col>
                    <Col xs={2}>
                        <button
                            type="submit"
                            tabIndex={tabIndex}
                            className="btn btn-link">
                            OK
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

/**
 * Props for the HeaderTitle component.
 * @typedef {Object} HeaderTitleProps
 * @property {string} title - The title text to be displayed.
 * @property {string} [img] - Optional URL of an image to be displayed alongside the title.
 * @property {string} [alt] - Optional alt text for the image.
 */
type HeaderTitleProps = {
    title: string;
    img?: string;
    alt?: string;
}

/**
 * HeaderTitle component for the modal.
 * @param {HeaderTitleProps} props - The properties for the HeaderTitle component.
 * @returns {JSX.Element} The HeaderTitle component.
 */
const HeaderTitle = ({ title, img, alt }: HeaderTitleProps): JSX.Element => {
    return (
        <>
            {
                img && alt &&
                <img
                    src={img}
                    alt={alt}
                    width={16} />
            }
            <h1 className="modal-title fs-5">{title}</h1>
        </>
    );
}

/**
 * Props for the Body component.
 * @typedef {Object} BodyProps
 * @property {ReactNode} children - The content to be displayed within the body.
 */
type BodyProps = {
    children: ReactNode;
}

/**
 * Body component for the modal.
 * @param {BodyProps} props - The properties for the Body component.
 * @returns {JSX.Element} The Body component.
 */
const Body = ({ children }: BodyProps): JSX.Element => {
    return (
        <Modal.Body className="pt-2 pb-5 px-0">
            {children}
        </Modal.Body>
    );
}


/**
 * ModalAction object containing all modal-related components.
 */
const ModalAction = {
    Form,
    Header,
    HeaderTitle,
    Body
};

export default ModalAction;
