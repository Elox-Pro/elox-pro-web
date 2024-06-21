import ListItem from "../../../common/components/list-item/list-item.component";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function ShowCompanyUserDetailsItem() {
    return (
        <ListItem.Content>
            <ListItem.BodyContent>
                <ListItem.Icon
                    icon={IconType.FileEarmarkSpreadsheet}
                    title="View details" />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}