import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item.component";
import { setOverlay } from "../../../common/features/common.slice";
import { useDeleteCompanyMutation } from "../../api/company.api";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

export default function DeleteCompanyItem() {

    const { company, totalCustomers, totalUsers } = useAppSelector((state) => state.companyInfo);
    const disabled = totalUsers > 0 || totalCustomers > 0;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mutation, { status, data }] = useDeleteCompanyMutation();

    const onSubmit = () => {
        try {
            if (company) {
                dispatch(setOverlay(true));
                mutation({
                    id: company.id,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            navigate("/cpanel/companies");
            toast.success("Company deleted successfully");
        }
    }, [status, data])

    const description = "The company cannot be deleted if it has active users or customers. Please remove or transfer them first.";

    return (
        <ListItem.Content onClick={onSubmit} disabled={disabled}>
            <ListItem.BodyContent>
                <ListItem.Icon
                    icon="bi bi-trash text-danger"
                    title="Delete company"
                    description={description} />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon="bi bi-chevron-right" />
        </ListItem.Content>
    )
}