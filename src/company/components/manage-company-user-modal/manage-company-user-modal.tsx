import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalAction from "../../../common/components/modal-action/modal-action-v1";
import Col from "react-bootstrap/esm/Col";
import { Card, ListGroup } from "react-bootstrap";
import RemoveUserFromCompanyItem from "../remove-user-from-company-item/remove-user-from-company-item";
import { setShowManageCompanyUserModal } from "../../features/company.slice";
import ShowCompanyUserDetailsItem from "../show-company-user-details-item/show-company-user-details-item";

export function ManageCompanyUserModal() {

    const { showManageCompanyUserModal, companyUser } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setShowManageCompanyUserModal(false));
    }

    return (
        companyUser &&
        <ModalAction.Content show={showManageCompanyUserModal}>
            <ModalAction.Header onClose={onClose} />
            <ModalAction.Body>
                <Row>
                    <Col xs={12}>
                        <p><strong>{`Manage ${companyUser.username}`}</strong></p>
                        <Card>
                            <Card.Body>
                                <p>Select an action from the list below.</p>
                                <ListGroup variant="flush">
                                    <ShowCompanyUserDetailsItem />
                                    <RemoveUserFromCompanyItem />
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </ModalAction.Body>
        </ModalAction.Content >
    );
}

