import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import ListGroupItemLabel from "../list-group-item-label/list-group-item-label.component";
import ListGroupItemValue from "../list-group-item-value/list-group-item-value.component";

/**
 * Props for ListGroupItemAvatar component
 */
type ListGroupItemAvatarProps = {
    label: string
    value: string | JSX.Element
    imageUrl: string
    onClick?: () => void
};

/**
 * Component for rendering ListGroupItem with avatar
 * @param {ListGroupItemAvatarProps} props - Props for ListGroupItemAvatar component
 * @returns {JSX.Element} - Rendered JSX element
 */
export default function ListGroupItemAvatar({
    label,
    value,
    imageUrl,
    onClick
}: ListGroupItemAvatarProps) {
    return (
        <ListGroup.Item className="px-0 py-3" action onClick={onClick}>
            <Row className="w-100 align-items-center g-0">
                <Col xs={9}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                        <ListGroupItemValue value={value} />
                    </Row>
                </Col>
                <Col xs={3} className="text-end">
                    <figure className="figure mb-0 text-center">
                        <img width={48}
                            className="rounded-circle"
                            src={imageUrl}
                            alt="avatar" />
                    </figure>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}