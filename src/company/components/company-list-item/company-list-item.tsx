import { useNavigate } from "react-router-dom";
import { Company } from "../../types/company.type";
import ListItem from "../../../common/components/list-item/list-item";
import { IconType } from "../../../common/enums/icon-type.enum";

type CompanyListItemProps = {
    company: Company;
}
export default function CompanyListItem({ company }: CompanyListItemProps) {

    const navigate = useNavigate();
    const companyInfoShow = () => {
        navigate(`/cpanel/companies/${company?.id}`);
    }

    return (
        company &&
        <ListItem onClick={companyInfoShow}>
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Image
                    src={company.imageUrl}
                    alt={company.name}
                    value={company.name} />
            </ListItem.Body>
        </ListItem>
    )
}