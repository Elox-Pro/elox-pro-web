import { useAppDispatch } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";
import { IconType } from "../../../common/enums/icon-type.enum";
import { showSelectUserModal } from "../../../users/features/select-user-slice";

export default function AddUserToCompanyItem() {

    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(showSelectUserModal(true));
    };

    return (
        <ListItem.Content onClick={onClick}>
            <ListItem.BodyContent>
                <ListItem.Icon
                    icon={IconType.PlusCircle}
                    title="Add user to company" />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}