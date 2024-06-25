import { useAppDispatch } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";
import { IconType } from "../../../common/enums/icon-type.enum";
import { setShowAddUserToCompanyModal } from "../../features/company.slice";

export default function AddUserToCompanyItem() {

    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(setShowAddUserToCompanyModal(true));
    };

    return (
        <ListItem onClick={onClick}>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Icon
                    icon={IconType.PlusCircle}
                    value="Add user to company" />
            </ListItem.Body>
        </ListItem>
    )
}