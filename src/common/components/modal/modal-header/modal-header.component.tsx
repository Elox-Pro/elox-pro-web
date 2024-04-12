import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

type ModalHeaderProps = {
    title: string
    buttonText: string
    onHide: () => void
    onSubmit: () => void
}
export function ModalHeader({ title, buttonText, onHide, onSubmit }: ModalHeaderProps) {
    return (<div className="modal-header px-0">
        <Container fluid>
            <Row className="g-0 align-items-center text-center">
                <Col xs={2}>
                    <button type="button" className="btn btn-close ms-0" onClick={onHide}></button>
                </Col>
                <Col xs={8}>
                    <h1 className="modal-title fs-5">{title}</h1>
                </Col>
                <Col xs={2}>
                    <button type="button" className="btn btn-link" onClick={onSubmit}>{buttonText}</button>
                </Col>
            </Row>
        </Container>
    </div>)
}