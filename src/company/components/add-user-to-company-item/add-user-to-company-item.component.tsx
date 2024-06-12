import { useAppDispatch } from "../../../app/hooks/app.hooks";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";
import SelectUserModal from "../../../users/components/select-user-modal/select-user-modal.component";
import { showSelectUserModal } from "../../../users/features/select-user-slice";

export default function AddUserToCompanyItem() {

    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(showSelectUserModal(true));
    };

    return (
        <>
            <ListGroupItem.Container onClick={onClick}>
                <ListGroupItem.Body>
                    <ListGroupItem.BodyIcon
                        iconClass="bi bi-plus-circle text-info" />
                    <ListGroupItem.BodySection>
                        <p className="mb-0">
                            Add user to company
                        </p>
                    </ListGroupItem.BodySection>
                </ListGroupItem.Body>
                <ListGroupItem.ChevronIcon />
            </ListGroupItem.Container>
            <SelectUserModal />
        </>
    )
}