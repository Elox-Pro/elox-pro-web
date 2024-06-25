import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalAction from "../../../common/components/modal-action/modal-action";
import Col from "react-bootstrap/esm/Col";
import RemoveUserFromCompanyItem from "../remove-user-from-company-item/remove-user-from-company-item";
import { setShowManageCompanyUserModal } from "../../features/company.slice";
import ShowCompanyUserDetailsItem from "../show-company-user-details-item/show-company-user-details-item";
import CardList from "../../../common/components/card-list/card-list";

export function ManageCompanyUserModal() {

    const { showManageCompanyUserModal, companyUser } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setShowManageCompanyUserModal(false));
    }

    return (
        companyUser &&
        <ModalAction show={showManageCompanyUserModal}>
            <ModalAction.Header onClose={onClose} />
            <ModalAction.Body>
                <ModalAction.Title value={`Manage ${companyUser.username}`} />
                <ModalAction.Description value={"Please select an action from the list below."} />
                <Row>
                    <Col xs={12}>
                        <CardList>
                            <ShowCompanyUserDetailsItem />
                            <RemoveUserFromCompanyItem />
                        </CardList>
                    </Col>
                </Row>
            </ModalAction.Body>
        </ModalAction >
    );
}

