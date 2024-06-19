import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

type PageHeaderProps = {
    title: string
    subtitle?: string
    description?: string
}
export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
    return (
        <Row className="text-center">
            <Col xs={12}>
                <p className="fs-1 mb-0">
                    {title}
                </p>
                <p className="fs-4 mb-1">{subtitle}</p>
                <p className="fs-6">{description}</p>
            </Col>
        </Row>
    )
}