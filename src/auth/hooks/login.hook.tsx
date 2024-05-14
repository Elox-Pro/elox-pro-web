import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { getSession } from "../helpers/get-session.helper";
import { useTranslation } from "react-i18next";
import { setTfaPending } from "../../tfa/features/tfa.slice";
import { login } from "../features/auth.slice";
import { toast } from "react-toastify";

export default function useLogin() {
    const { t } = useTranslation("auth", { keyPrefix: "login" });
    const { tfaUsername } = useAppSelector((state) => state.tfa);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        try {
            const { activeUser } = getSession();
            if (activeUser === null) {
                throw new Error("Active user is null");
            }
            dispatch(setTfaPending(false));
            dispatch(login(activeUser));
            navigate("/cpanel/dashboard", { replace: true });
            toast(t("welcome", { username: tfaUsername }));

        } catch (error) {
            throw error;
        }
    }

    return {
        handleLogin
    }
}