import { useTranslation } from "react-i18next"
import { useLogoutMutation } from "../../../auth/api/auth.api"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { logout } from "../../../auth/features/auth.slice"
import { useNavigate } from "react-router-dom"

export default function CPLogout() {
    const { t } = useTranslation("cpanel", { keyPrefix: "logout" })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mutation, { status, isLoading }] = useLogoutMutation()

    const onSubmit = () => {
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

    return (
        <button type="button" disabled={isLoading} className="dropdown-item" onClick={onSubmit}>
            {t("text")}
        </button>
    )
}