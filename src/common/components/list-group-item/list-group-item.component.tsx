import { ReactNode } from "react";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

/**
 * Props for the Container component.
 * @typedef {Object} ContainerProps
 * @property {ReactNode} children - The content to be wrapped inside the container.
 */
type ContainerProps = {
    children: ReactNode;
};

/**
 * Container component to wrap children elements inside a ListGroup.Item.
 * @param {ContainerProps} props - Component props.
 * @returns {JSX.Element} A styled ListGroup.Item containing the children.
 */
const Container = ({ children }: ContainerProps): JSX.Element => {
    return (
        <ListGroup.Item className="px-0 py-3" action>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </ListGroup.Item>
    );
};

/**
 * Props for the Body component.
 * @typedef {Object} BodyProps
 * @property {ReactNode} children - The content to be wrapped inside the body.
 * @property {Function} [onClick] - Optional click handler for the body.
 */
type BodyProps = {
    children: ReactNode;
    onClick?: () => void;
};

/**
 * Body component to wrap children elements inside a Bootstrap column.
 * @param {BodyProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the children.
 */
const Body = ({ children, onClick }: BodyProps): JSX.Element => {
    return (
        <Col xs={9} onClick={onClick}>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </Col>
    );
};

/**
 * Props for the Dots component.
 * @typedef {Object} DotsProps
 * @property {Function} [onClick] - Optional click handler for the icon.
 */
type DotsProps = {
    onClick?: () => void;
};

/**
 * Dots component to display a clickable icon with three vertical dots.
 * @param {DotsProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the clickable icon.
 */
const Dots = ({ onClick }: DotsProps): JSX.Element => {
    return (
        <Col xs={3} className="text-end">
            <i className="bi bi-three-dots-vertical fs-4 fw-bold" onClick={onClick}></i>
        </Col>
    );
};

/**
 * Props for the BodyImage component.
 * @typedef {Object} BodyImageProps
 * @property {string} src - The source URL of the image.
 * @property {string} alt - The alt text for the image.
 * @property {number} [col=3] - Optional column size for the image.
 */
type BodyImageProps = {
    src: string;
    alt: string;
    col?: number;
};

/**
 * BodyImage component to display an image inside a Bootstrap column.
 * @param {BodyImageProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the image.
 */
const BodyImage = ({ src, alt, col = 3 }: BodyImageProps): JSX.Element => {
    return (
        <Col xs={col}>
            <img width={24} src={src} alt={alt} />
        </Col>
    );
};

/**
 * Props for the BodySection component.
 * @typedef {Object} BodySectionProps
 * @property {ReactNode} children - The content to be wrapped inside the body section.
 * @property {number} [col=9] - Optional column size for the body section.
 */
type BodySectionProps = {
    children: ReactNode;
    col?: number;
};

/**
 * BodySection component to wrap children elements inside a Bootstrap column.
 * @param {BodySectionProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the children.
 */
const BodySection = ({ children, col = 9 }: BodySectionProps): JSX.Element => {
    return (
        <Col xs={col}>
            {children}
        </Col>
    );
};

/**
 * Exported object containing all ListGroupItem sub-components.
 */
const ListGroupItem = {
    Container,
    Dots,
    Body,
    BodyImage,
    BodySection
};

export default ListGroupItem;