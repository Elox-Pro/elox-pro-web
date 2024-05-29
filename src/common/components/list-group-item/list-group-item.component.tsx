import { ReactNode } from "react";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

/**
 * Props for the Container component.
 * @typedef {Object} ContainerProps
 * @property {ReactNode} children - The content to be wrapped inside the container.
 * @property {Function} [onClick] - Optional click handler for item.
 */
type ContainerProps = {
    children: ReactNode;
    onClick?: () => void;
};

/**
 * Container component to wrap children elements inside a ListGroup.Item.
 * @param {ContainerProps} props - Component props.
 * @returns {JSX.Element} A styled ListGroup.Item containing the children.
 */
const Container = ({ children, onClick }: ContainerProps): JSX.Element => {
    return (
        <ListGroup.Item className="px-0 py-3" action onClick={onClick}>
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
 
 */
type BodyProps = {
    children: ReactNode;
};

/**
 * Body component to wrap children elements inside a Bootstrap column.
 * @param {BodyProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the children.
 */
const Body = ({ children }: BodyProps): JSX.Element => {
    return (
        <Col xs={9}>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </Col>
    );
};

/**
 * Dots Icon component to display icon with three vertical dots.
 * @returns {JSX.Element} A Bootstrap column containing the icon.
 */
const DotsIcon = (): JSX.Element => {
    return (
        <Col xs={3} className="text-end">
            <i className="bi bi-three-dots-vertical fs-4 fw-bold"></i>
        </Col>
    );
};

/**
 * Chevron Icon component to display icon with a chevron right.
 * @returns {JSX.Element} A Bootstrap column containing the icon.
 */
const ChevronIcon = (): JSX.Element => {
    return (
        <Col xs={3} className="text-end">
            <i className="bi bi-chevron-right fs-4 fw-bold"></i>
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
 * Props for the BodyIcon component.
 * @typedef {Object} BodyIconProps
 * @property {string} iconClass - The iconClass for the icon.
 * @property {number} [col=3] - Optional column size for the image.
 */
type BodyIconProps = {
    iconClass: string;
    col?: number;
}

/**
 * BodyIcon component to display an icon inside a Bootstrap column.
 * @param {BodyIconProps} props - Component props.
 * @returns {JSX.Element} A Bootstrap column containing the icon.
 */
const BodyIcon = ({ iconClass, col = 3 }: BodyIconProps) => {
    return (
        <Col xs={col}>
            <i className={`${iconClass} fs-3`}></i>
        </Col>
    )
}

/**
 * Props for the BodyLabel component.
 * @typedef {Object} BodyLabelProps
 * @property {string} value - The value of the label.
 */
type BodyLabelProps = {
    value: string;
}

/**
 * BodyLabel component to display label inside a Bootstrap column.
 * @param {BodyLabelProps} props - Component props.
 * @returns The JSX.Element containing the label.
 */
const BodyLabel = ({ value }: BodyLabelProps) => {
    return (
        <Col xs={12} md={4}>
            <p className="mb-0 text-muted">
                {value}
            </p>
        </Col>
    )
}

/**
 * Props for the BodyValue component.
 * @typedef {Object} BodyValueProps
 * @property {string} value - The value of the component.
 */
type BodyValueProps = {
    value: string;
}

/**
 * BodyValue component to display value inside a Bootstrap column.
 * @param {BodyValueProps} props - Component props.
 * @returns {JSX.Element} The JSX.Element containing the value.
 */
const BodyValue = ({ value }: BodyValueProps) => {
    return (
        <Col xs={12} md={8}>
            <p className="mb-0">
                <span className="me-3">
                    {value}
                </span>
            </p>
        </Col>
    )
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
    DotsIcon,
    ChevronIcon,
    Body,
    BodyImage,
    BodyIcon,
    BodySection,
    BodyLabel,
    BodyValue,
};

export default ListGroupItem;