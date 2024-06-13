import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalAction from "../../../common/components/modal-action/modal-action.component";
import { showManageCompanyUserModal } from "../../features/manage-company-user-modal.slice";
import Col from "react-bootstrap/esm/Col";
import { Card, ListGroup } from "react-bootstrap";
import ListItem from "../../../common/components/list-item/list-item.component";
import RemoveUserFromCompanyItem from "../remove-user-from-company-item/remove-user-from-company-item.component";

export function ManageCompanyUserModal() {

    const { modal, user } = useAppSelector((state) => state.manageCompanyUserModal);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(showManageCompanyUserModal(false));
    }

    if (user === null) {
        return null;
    }

    return (
        <ModalAction.Content
            show={modal.show}>
            <ModalAction.Header onClose={onClose} >
                <ModalAction.Title value={`Manage ${user.username}`} />
            </ModalAction.Header>
            <ModalAction.Body>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <p>Select an action from the list below.</p>
                                <ListGroup variant="flush">
                                    <ListItem.Content>
                                        <ListItem.BodyContent>
                                            <ListItem.Icon
                                                icon="bi bi-file-earmark-spreadsheet"
                                                value="View details" />
                                        </ListItem.BodyContent>
                                        <ListItem.BodyIcon icon="bi bi-chevron-right" />
                                    </ListItem.Content>
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

