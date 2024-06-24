import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ListItem from "../../../common/components/list-item/list-item";
import { setOverlay } from "../../../common/features/common.slice";
import { useDeleteCompanyMutation } from "../../api/company.api";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function DeleteCompanyItem() {

    const { company, totalCompanyUsers } = useAppSelector((state) => state.company);
    const disabled = totalCompanyUsers > 0;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mutation, { status, data }] = useDeleteCompanyMutation();

    const onSubmit = () => {
        try {

            dispatch(setOverlay(true));
            mutation({
                id: company?.id || 0,
            });

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
        <ListItem onClick={onSubmit} disabled={disabled} variant="danger">
            <ListItem.Body icon={IconType.ChevronRight}>
                <ListItem.Icon
                    icon={IconType.Trash}
                    value="Delete company"
                    description={description} />
            </ListItem.Body>
        </ListItem>
    )
}