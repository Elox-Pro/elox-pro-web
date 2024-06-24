import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setOverlay } from "../../../common/features/common.slice";
import { useRemoveUserFromCompanyMutation } from "../../api/company.api";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { userApi } from "../../../users/api/user.api";
import ListItem from "../../../common/components/list-item/list-item-v1";
import { setShowManageCompanyUserModal } from "../../features/company.slice";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function RemoveUserFromCompanyItem() {
    const { companyUser, company } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const [mutation, { status, data }] = useRemoveUserFromCompanyMutation();

    const onSubmit = () => {
        try {
            dispatch(setOverlay(true));
            mutation({
                companyId: company?.id || 0,
                userId: companyUser?.id || 0,
            });
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            dispatch(setShowManageCompanyUserModal(false));
            dispatch(userApi.util.invalidateTags(["getUsers"]));
            toast.success("User removed from company successfully");
        }
    }, [status, data]);

    return (
        companyUser && company &&
        <ListItem.Content onClick={onSubmit} variant="danger">
            <ListItem.BodyContent>
                <ListItem.Icon
                    icon={IconType.Trash}
                    title="Remove user from company" />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.ChevronRight} />
        </ListItem.Content>
    )
}