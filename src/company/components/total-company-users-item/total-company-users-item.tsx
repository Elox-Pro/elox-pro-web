import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";

export default function TotalCompanyUsersItem() {

    const { totalCompanyUsers } = useAppSelector((state) => state.company);

    return (
        <ListItem>
            <ListItem.Body>
                <ListItem.Label label={`${totalCompanyUsers} users`} />
            </ListItem.Body>
        </ListItem>
    )
}