import ListItem from "../../../common/components/list-item/list-item";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function ShowCompanyUserDetailsItem() {
    return (
        <ListItem>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Icon
                    icon={IconType.FileEarmarkSpreadsheet}
                    value="View details" />
            </ListItem.Body>
        </ListItem>
    )
}