import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";
import { getFormatDate } from "../../../common/helpers/get-format-date";

export default function CompanyUpdateAtItem() {
    const { company } = useAppSelector((state) => state.company);
    const formatDate = getFormatDate(company?.updatedAt || null);
    return (
        company &&
        <ListItem>
            <ListItem.Body>
                <ListItem.Label label="Updated at" value={formatDate} />
            </ListItem.Body>
        </ListItem>
    )
}