import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";
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
        <ListItem.Content onClick={onClick}>
            <ListItem.BodyContent>
                <ListItem.Label value="Company Name" />
                <ListItem.Section>
                    <p className="mb-0">
                        <img src={company.imageUrl} alt={company.name} width={24} />
                        <span className="ms-3">{company.name}</span>
                    </p>
                </ListItem.Section>
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}