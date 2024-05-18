import { useEffect } from "react";
import { useCheckMutation } from "../../auth/api/auth.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { setShowSessionExpiryModal } from "../features/cp.slice";
import { useTranslation } from "react-i18next";
import { setOverlay } from "../../common/features/common.slice";

export function useStayInSession() {
    const { t } = useTranslation("cpanel", { keyPrefix: "session-expiry" });
    const [mutation, { status }] = useCheckMutation();
    const { overlay } = useAppSelector((state) => state.common);
    const dispatch = useAppDispatch();

    const handleCheck = () => {
        try {
            dispatch(setOverlay(true));
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
        overlay
    }
}