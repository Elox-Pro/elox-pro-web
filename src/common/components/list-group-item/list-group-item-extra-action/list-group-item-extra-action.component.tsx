import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import ListGroupItemLabel from "../list-group-item-label/list-group-item-label.component";
import Button from "react-bootstrap/esm/Button"

/**
 * Props for ListGroupItemExtraAction component
 */
type ListGroupItemExtraActionProps = {
    label: string;
    text: string;
    icon: string;
    onClick?: () => void;
};

/**
 * Component for rendering ListGroupItem with extra action
 * @param {ListGroupItemExtraActionProps} props - Props for ListGroupItemExtraAction component
 * @returns {JSX.Element | null} - Rendered JSX element or null if required props are missing
 */
export function ListGroupItemExtraAction({
    label,
    text,
    icon,
    onClick
}: ListGroupItemExtraActionProps) {
    return (
        <ListGroup.Item className="px-0 py-3">
            <Row className="w-100 align-items-center g-0">
                <Col xs={12}>
                    <Row className="w-100 align-items-center g-0">
                        <ListGroupItemLabel value={label} />
                    </Row>
                </Col>
                <Col xs={12}>
                    <Button
                        onClick={onClick}
                        variant="outline-dark"
                        className="mt-4 fw-medium">
                        <i className={`${icon} text-primary me-2`}></i>
                        <span>{text}</span>
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}
