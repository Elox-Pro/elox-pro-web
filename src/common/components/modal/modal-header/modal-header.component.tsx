import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

type ModalHeaderProps = {
    title: string
    buttonText: string
    disabled: boolean,
    tabIndex?: number,
    onHide: () => void
    onSubmit?: () => void
}
export default function ModalHeader({ title, buttonText, tabIndex, onHide, onSubmit, disabled }: ModalHeaderProps) {
    return (<div className="modal-header px-0">
        <Container fluid>
            <Row className="g-0 align-items-center text-center">
                <Col xs={2}>
                    <button
                        type="button"
                        className="btn btn-close ms-0"
                        onClick={onHide}>
                    </button>
                </Col>
                <Col xs={8}>
                    <h1 className="modal-title fs-5">{title}</h1>
                </Col>
                <Col xs={2}>
                    <button
                        type="submit"
                        className="btn btn-link"
                        tabIndex={tabIndex}
                        onClick={onSubmit}
                        disabled={disabled}>
                        {buttonText}
                    </button>
                </Col>
            </Row>
        </Container>
    </div>)
}