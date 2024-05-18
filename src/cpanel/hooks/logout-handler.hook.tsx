import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { useLogoutMutation } from "../../auth/api/auth.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { logout } from "../../auth/features/auth.slice";
import { setOverlay } from "../../common/features/common.slice";

export function useLogoutHandler() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { overlay } = useAppSelector((state) => state.common);
    const [mutation, { status }] = useLogoutMutation();

    const handleLogout = () => {
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
            dispatch(logout())
            navigate("/auth/signin/", { replace: true });
        }
    }, [status]);

    return {
        handleLogout,
        overlay
    }
}