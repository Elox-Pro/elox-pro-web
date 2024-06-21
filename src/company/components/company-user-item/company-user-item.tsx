import { useAppDispatch } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";
import { IconType } from "../../../common/enums/icon-type.enum";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import { User } from "../../../users/types/user.type";
import { setCompanyUser, setShowManageCompanyUserModal } from "../../features/company.slice";

type CompanyUserItemProps = {
    user: User;
}
export default function CompanyUserItem({ user }: CompanyUserItemProps) {

    const dispatch = useAppDispatch();

    const avatar = getProfileAvatar(user.avatarUrl);
    const username = user.username || "";

    const onClick = () => {
        dispatch(setCompanyUser(user));
        dispatch(setShowManageCompanyUserModal(true));
    }

    return (
        <ListItem.Content onClick={onClick}>
            <ListItem.BodyContent>
                <ListItem.Image
                    src={avatar}
                    alt={username}
                    title={username}
                    description={user.roleText}
                />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}