import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import ListGroupItemLabel from "../list-group-item-label/list-group-item-label.component";
import ListGroupItemValue from "../list-group-item-value/list-group-item-value.component";

/**
 * Props for ListGroupItemDefault component
 */
type ListGroupItemDefaultProps = {
    label: string;
    value: string | JSX.Element;
    hidden?: boolean;
    icon?: string;
    onClick?: () => void;
};

/**
 * Component for rendering default ListGroupItem
 * @param {ListGroupItemDefaultProps} props - Props for ListGroupItemDefault component
 * @returns {JSX.Element} - Rendered JSX element 
 */
export default function ListGroupItemDefault({
    label,
    value,
    hidden = false,
    icon = "bi bi-chevron-right",
    onClick = () => null
}: ListGroupItemDefaultProps) {
    const display = hidden ? "d-none" : "";
    return (
        <ListGroup.Item className="px-0 py-3" action onClick={onClick}>
            <Row className="w-100 align-items-center g-0">
                <Col xs={9}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                        <ListGroupItemValue value={value} />
                    </Row>
                </Col>
                <Col xs={3} className={`${display} text-end`}>
                    <i className={`${icon} fs-4 fw-bold`}></i>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

