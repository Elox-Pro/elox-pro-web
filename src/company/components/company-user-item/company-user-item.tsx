import { useAppDispatch } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";
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
    const roleText = user.roleText || "";

    const onClick = () => {
        dispatch(setCompanyUser(user));
        dispatch(setShowManageCompanyUserModal(true));
    }

    return (
        <ListItem onClick={onClick}>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Image
                    src={avatar}
                    alt={username}
                    value={username}
                    description={roleText}
                />
            </ListItem.Body>
        </ListItem>
    )
}