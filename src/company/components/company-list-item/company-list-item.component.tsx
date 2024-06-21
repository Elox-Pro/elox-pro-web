import { useNavigate } from "react-router-dom";
import { Company } from "../../types/company.type";
import ListItem from "../../../common/components/list-item/list-item.component";
import { IconType } from "../../../common/enums/icon-type.enum";

type CompanyListItemProps = {
    company: Company;
}
export default function CompanyListItem({ company }: CompanyListItemProps) {

    if (!company) return null;

    const navigate = useNavigate();
    const companyInfoShow = () => {
        navigate(`/cpanel/companies/${company.id}`);
    }

    return (
        <ListItem.Content onClick={companyInfoShow}>
            <ListItem.BodyContent>
                <ListItem.Image
                    src={company.imageUrl}
                    alt={company.name}
                    title={company.name}
                    description={String(company.updatedAt)}
                />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>

    )
}