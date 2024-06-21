import { IconType } from "../../../common/enums/icon-type.enum";
import ListItem from "../../../common/components/list-item/list-item.component";

export default function ShowMoreCompanyUsersItem() {

    const onClick = () => {
        alert("Show more users");
    }
    return (
        <ListItem.Content onClick={onClick}>
            <ListItem.BodyContent>
                <ListItem.Label value={"Show more users"} />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}