import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/app.hooks";
import { useLogoutMutation } from "../../auth/api/auth.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { logout } from "../../auth/features/auth.slice";

export function useLogoutHandler() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mutation, { status, isLoading }] = useLogoutMutation()

    const handleLogout = () => {
        try {
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
        isLoading
    }
}