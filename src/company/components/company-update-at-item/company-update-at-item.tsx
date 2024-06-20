import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";
import { getFormatDate } from "../../../common/helpers/get-format-date";

export default function CompanyUpdateAtItem() {
    const { company } = useAppSelector((state) => state.company);
    if (!company) {
        return null;
    }
    const formatDate = getFormatDate(company.updatedAt);
    return (
        <ListItem.Content>
            <ListItem.BodyContent>
                <ListItem.Label value="Updated at" />
                <ListItem.Value value={formatDate} />
            </ListItem.BodyContent>
        </ListItem.Content>
    )
}