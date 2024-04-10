import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";

/**
 * Props for ListGroupItemLabel component
 */
type ListGroupItemLabelProps = {
    value: string;
};

/**
 * Component for rendering label in ListGroupItem
 * @param {ListGroupItemLabelProps} props - Props for ListGroupItemLabel component
 * @returns {JSX.Element} - Rendered JSX element
 */
function ListGroupItemLabel({ value }: ListGroupItemLabelProps) {
    return (
        <Col xs={12} md={3}>
            <p className="mb-0 text-muted">{value}</p>
        </Col>
    );
}

/**
 * Props for ListGroupItemValue component
 */
type ListGroupItemValueProps = {
    value: string;
};

/**
 * Component for rendering value in ListGroupItem
 * @param {ListGroupItemValueProps} props - Props for ListGroupItemValue component
 * @returns {JSX.Element} - Rendered JSX element
 */
function ListGroupItemValue({ value }: ListGroupItemValueProps) {
    return (
        <Col xs={12} md={9}>
            <p className="mb-0">{value}</p>
        </Col>
    );
}

/**
 * Props for ListGroupItemAvatar component
 */
type ListGroupItemAvatarProps = {
    label: string;
    value: string;
    imageUrl: string;
};

/**
 * Component for rendering ListGroupItem with avatar
 * @param {ListGroupItemAvatarProps} props - Props for ListGroupItemAvatar component
 * @returns {JSX.Element} - Rendered JSX element
 */
function ListGroupItemAvatar({ label, value, imageUrl }: ListGroupItemAvatarProps) {
    return (
        <ListGroup.Item className="px-0 py-3">
            <Row className="w-100 align-items-center g-0">
                <Col xs={9}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                        <ListGroupItemValue value={value} />
                    </Row>
                </Col>
                <Col xs={3}>
                    <figure className="figure mb-0 text-center">
                        <img width={48} className="rounded-circle"
                            src={imageUrl}
                            alt="avatar" />
                        <figcaption className="figure-caption">
                            <i className="bi bi-camera"></i>
                        </figcaption>
                    </figure>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

/**
 * Props for ListGroupItemExtraAction component
 */
type ListGroupItemExtraActionProps = {
    label: string;
    text?: string; // Make text optional
    icon?: string; // Make icon optional
    to?: string; // Make to optional
};

/**
 * Component for rendering ListGroupItem with extra action
 * @param {ListGroupItemExtraActionProps} props - Props for ListGroupItemExtraAction component
 * @returns {JSX.Element | null} - Rendered JSX element or null if required props are missing
 */
function ListGroupItemExtraAction({ label, text, icon, to }: ListGroupItemExtraActionProps) {
    if (!text || !icon || !to) return null; // Return null if required props are missing
    return (
        <ListGroup.Item className="px-0 py-3">
            <Row className="w-100 align-items-center g-0">
                <Col xs={12}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                    </Row>
                </Col>
                <Col xs={12}>
                    <Link to={to} className="mt-4 fw-medium btn btn-outline btn-outline-dark">
                        <i className={`${icon} text-primary`}></i><span>{text}</span>
                    </Link>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

/**
 * Props for ListGroupItemDefault component
 */
type ListGroupItemDefaultProps = {
    label: string;
    value: string;
    hidden?: boolean;
    icon?: string;
    onClick?: () => void;
};

/**
 * Component for rendering default ListGroupItem
 * @param {ListGroupItemDefaultProps} props - Props for ListGroupItemDefault component
 * @returns {JSX.Element} - Rendered JSX element
 */
function ListGroupItemDefault({ label, value, hidden = false, icon = "bi bi-chevron-right", onClick = () => null }: ListGroupItemDefaultProps) {
    const display = hidden ? "d-none" : "";
    return (
        <ListGroup.Item className="px-0 py-3">
            <Row className="w-100 align-items-center g-0">
                <Col xs={9}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                        <ListGroupItemValue value={value} />
                    </Row>
                </Col>
                <Col xs={3} className={`${display} text-end`}>
                    <button className="mt-4 fw-medium" onClick={onClick}>
                        <i className={`${icon} fs-4 fw-bold`}></i>
                    </button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

/**
 * Enum representing type of ListGroupItem
 */
enum ListGroupItemType {
    AVATAR,
    DEFAULT,
    EXTRA_ACTION
}

/**
 * Props for ListGroupItem component
 */
type ListGroupItemProps = {
    type: ListGroupItemType;
    label: string;
    value: string;
    imageUrl?: string;
    text?: string;
    icon?: string;
    to?: string;
    hidden?: boolean;
    onClick?: () => void;
};

/**
 * Component for rendering ListGroupItem based on type
 * @param {ListGroupItemProps} props - Props for ListGroupItem component
 * @returns {JSX.Element} - Rendered JSX element
 */
export default function ListGroupItem({
    type,
    label,
    value,
    imageUrl,
    text,
    icon,
    to,
    hidden,
    onClick
}: ListGroupItemProps) {
    switch (type) {

        case ListGroupItemType.AVATAR:
            return (
                <>{imageUrl &&
                    <ListGroupItemAvatar
                        label={label}
                        value={value}
                        imageUrl={imageUrl} />
                }</>
            );

        case ListGroupItemType.EXTRA_ACTION:
            return (
                <ListGroupItemExtraAction
                    label={label}
                    text={text}
                    icon={icon}
                    to={to} />
            );

        case ListGroupItemType.DEFAULT:
        default:
            return (
                <ListGroupItemDefault
                    label={label}
                    value={value}
                    hidden={hidden}
                    icon={icon}
                    onClick={onClick} />
            );
    }
}