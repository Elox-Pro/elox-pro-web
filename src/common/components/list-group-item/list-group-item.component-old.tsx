import Button from "react-bootstrap/esm/Button"
import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/esm/ListGroup"
import Row from "react-bootstrap/esm/Row"

export enum ListGroupItemType {
    DEFAULT,
    WITH_BUTTON,
    WITH_IMAGE
}

type ListGroupItemProps = {
    type: ListGroupItemType,
    label: string,
    value: string,
    imageUrl?: string

}
export default function ListGroupItem({ type, label, value, imageUrl }: ListGroupItemProps) {
    return (
        <ListGroup.Item className="px-0 py-3">
            <Row className="w-100 align-items-center g-0">
                <Col xs={9} >
                    <Row className="w-100 align-items-center g-0">
                        <ColLabelValue label={label} value={value} />
                    </Row>
                </Col>
                <Col xs={3} className="text-end">
                    {imageUrl && getType(type, imageUrl)}
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

function ColLabelValue({ label, value }: { label: string, value: string }) {
    return (
        <>
            <Col xs={12} md={3}>
                <p className="mb-0 text-muted">{label}</p>
            </Col>
            <Col xs={12} md={9}>
                <p className="mb-0">{value}</p>
            </Col>
        </>
    )
}

function ColLabelButton({ label, buttonText, buttonIcon, onClick }: { label: string, buttonText: string, buttonIcon: string, onClick: () => void }) {
    return (
        <>
            <Col xs={12} md={3}>
                <p className="mb-0 text-muted">{label}</p>
            </Col>
            <Col xs={12} md={9}>
                <Button variant="outline-dark" className="mt-4 fw-medium" onClick={onClick}>{buttonText}</Button>
                <i className={`${buttonIcon} text-primary`}></i> <span>{buttonText}</span>
            </Col>
        </>
    )
}

function getType(type: ListGroupItemType, imageUrl: string): JSX.Element {

    switch (type) {
        case ListGroupItemType.WITH_IMAGE:
            return (
                <figure className="figure mb-0 text-center">
                    <img width={48} className="rounded-circle"
                        src={imageUrl}
                        alt="avatar" />
                    <figcaption className="figure-caption">
                        <i className="bi bi-camera"></i>
                    </figcaption>
                </figure>

            )
        default:
            return (
                <i className="fs-4 fw-bold bi bi-chevron-right"></i>
            );
    }
}