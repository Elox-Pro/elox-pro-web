import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

type ListGroupItemAvatarDefaultProps = {
    label: string
    value: string | null
}
export default function ListGroupItemDefault({ label, value }: ListGroupItemAvatarDefaultProps) {

    return (
        <ListGroup.Item className="px-0 py-3" action>
            <Row className="w-100 align-items-center g-0">
                <Col xs={12}>
                    <Row className="w-100 align-items-center g-0">
                        <Col xs={12} md={3}>
                            <p className="mb-0 text-muted">
                                {label}
                            </p>
                        </Col>
                        <Col xs={12} md={9}>
                            <p className="mb-0">
                                {value || "N/A"}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}