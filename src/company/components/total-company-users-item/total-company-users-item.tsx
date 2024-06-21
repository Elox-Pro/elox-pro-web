import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";

export default function TotalCompanyUsersItem() {

    const { totalCompanyUsers } = useAppSelector((state) => state.company);

    return (
        <ListItem.Content>
            <ListItem.BodyContent>
                <ListItem.Label value={`${totalCompanyUsers} users`} />
            </ListItem.BodyContent>
        </ListItem.Content>
    )
}