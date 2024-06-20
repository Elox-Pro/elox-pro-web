import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import CompanyNameItem from "../company-name-item/company-name-item";
import CompanyUpdateAtItem from "../company-update-at-item/company-update-at-item";

export default function CompanyBasicInfoCard() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-file-check me-3"></i>
                    <span>Basic Info</span>
                </Card.Title>
                <ListGroup variant="flush">
                    <CompanyNameItem />
                    <CompanyUpdateAtItem />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}