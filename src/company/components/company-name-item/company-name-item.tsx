import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";
import { IconType } from "../../../common/enums/icon-type.enum";
import { setShowEditCompanyNameModal } from "../../features/company.slice";

export default function CompanyNameItem() {
    const { company } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();
    if (!company) {
        return null;
    }
    const onClick = () => {
        dispatch(setShowEditCompanyNameModal(true));
    }

    return (
        <ListItem onClick={onClick}>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Label label="Company Name" value={company.name} />
            </ListItem.Body>
        </ListItem>
    )
}