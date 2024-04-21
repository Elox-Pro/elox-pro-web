import { useTranslation } from "react-i18next"
import { useLogoutRequestMutation } from "../../../auth/api/auth.api"
import { useEffect, useState } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"
import { setOverlay } from "../../../common/features/common.slice"
import { toast } from "react-toastify"
import { handleRejected } from "../../../common/helpers/handle-rejected.helper"
import { deleteSession, setActiveUser } from "../../../auth/features/auth.slice"
import { useNavigate } from "react-router-dom"

export default function CPLogout() {
    const { t } = useTranslation("cpanel", { keyPrefix: "logout" })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [logoutRequest, { status, error }] = useLogoutRequestMutation()

    const onSubmit = () => {
        try {
            onInitRequest();
            logoutRequest();
        } catch (error) {
            onErrorRequest(error);
        }
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.rejected: onRejected(); break;
            case QueryStatus.fulfilled: onFulfilled(); break;
        }
    }, [status, error]);

    const onInitRequest = () => {
        dispatch(setOverlay(true))
        setDisabled(true)
    }

    const onErrorRequest = (error: any) => {
        dispatch(setOverlay(false));
        setDisabled(false);
        toast.error(t("error.on-request"));
        console.error("Logout Error:", error);
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Logout Rejected", navigate });
    }

    const onFulfilled = () => {
        // dispatch(setActiveUser({
        //     username: null,
        //     role: null,
        //     isAuthenticated: false
        // }))
        dispatch(deleteSession())
        dispatch(setOverlay(false));
        setDisabled(false);
        navigate("/auth/signin/", { replace: true });
    }

    return (
        <button type="button" disabled={disabled} className="dropdown-item" onClick={onSubmit}>
            {t("text")}
        </button>
    )
}