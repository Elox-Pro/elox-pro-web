import { IconType } from "../../../common/enums/icon-type.enum";
import ListItem from "../../../common/components/list-item/list-item";

export default function ShowMoreCompanyUsersItem() {

    const onClick = () => {
        alert("Show more users");
    }
    return (
        <ListItem onClick={onClick}>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Label label={"Show more users"} />
            </ListItem.Body>
        </ListItem>
    )
}