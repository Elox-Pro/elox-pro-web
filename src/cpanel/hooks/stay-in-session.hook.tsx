import { useEffect } from "react";
import { useCheckMutation } from "../../auth/api/auth.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks/app.hooks";
import { setShowSessionExpiryModal } from "../features/cp.slice";
import { useTranslation } from "react-i18next";

export function useStayInSession() {
    const { t } = useTranslation("cpanel", { keyPrefix: "session-expiry" });
    const [mutation, { status, isLoading }] = useCheckMutation();
    const dispatch = useAppDispatch();

    const handleCheck = () => {
        try {
            mutation();
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            dispatch(setShowSessionExpiryModal(false));
            toast.success(t("toast.success"));
        }
    }, [status]);

    return {
        handleCheck,
        isLoading
    }
}