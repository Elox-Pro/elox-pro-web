import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";
import { setShowModal } from "../../features/company-update-name.slice";
import CompanyUpdateNameModal from "../company-update-name-modal/company-update-name-modal.component";

export default function CompanyNameItem() {
    const company = useAppSelector((state) => state.companyInfo.company);
    const dispatch = useAppDispatch();
    if (!company) {
        return null;
    }
    const onClick = () => {
        dispatch(setShowModal(true));
    }
    return (
        <>
            <ListGroupItem.Container onClick={onClick}>
                <ListGroupItem.Body>
                    <ListGroupItem.BodyLabel value="Company Name" />
                    <ListGroupItem.BodySection col={8} >
                        <p className="mb-0">
                            <img src={company.imageUrl} alt={company.name} width={24} />
                            <span className="ms-3">{company.name}</span>
                        </p>
                    </ListGroupItem.BodySection>
                </ListGroupItem.Body>
                <ListGroupItem.ChevronIcon />
            </ListGroupItem.Container>
            <CompanyUpdateNameModal />
        </>
    )
}