import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setOverlay } from "../../../common/features/common.slice";
import { useRemoveUserFromCompanyMutation } from "../../api/company.api";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { showManageCompanyUserModal } from "../../features/manage-company-user-modal.slice";
import { userApi } from "../../../users/api/user.api";
import ListItem from "../../../common/components/list-item/list-item.component";

export default function RemoveUserFromCompanyItem() {
    const { user, company } = useAppSelector((state) => state.manageCompanyUserModal);
    const dispatch = useAppDispatch();

    if (user === null || company === null) {
        return null;
    }

    const [mutation, { status, data }] = useRemoveUserFromCompanyMutation();

    const onSubmit = () => {
        try {
            dispatch(setOverlay(true));
            mutation({
                companyId: company.id,
                userId: user.id,
            });
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            dispatch(showManageCompanyUserModal(false));
            dispatch(userApi.util.invalidateTags(["getUsers"]));
            toast.success("User removed from company successfully");
        }
    }, [status, data]);


    return (
        <ListItem.Content onClick={onSubmit}>
            <ListItem.BodyContent>
                <ListItem.Icon
                    icon="bi bi-trash text-danger"
                    title="Remove user from company" />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon="bi bi-chevron-right" />
        </ListItem.Content>
    )
}