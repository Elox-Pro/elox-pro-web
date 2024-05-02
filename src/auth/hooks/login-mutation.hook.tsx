import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { getGRecaptchaToken, useGRecaptcha } from "../../common/hooks/grecaptcha.hook";
import { useLoginRequestMutation } from "../api/auth.api";
import { LoginRequest } from "../types/login/login-request.type";
import { setTfaPending, setTfaUsername } from "../../tfa/features/tfa.slice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { getActiveUserFromCookies } from "../helpers/get-active-user-from-cookies.helper";
import { login } from "../features/auth.slice";
import { useTranslation } from "react-i18next";

export default function useLoginMutation() {
    const dispatch = useAppDispatch();
    const grecaptcha = useGRecaptcha();
    const navigate = useNavigate();
    const { tfaUsername } = useAppSelector((state) => state.tfa);
    const { t } = useTranslation("auth", { keyPrefix: "login" });
    const [loginRequest, { data, status, error, isLoading }] = useLoginRequestMutation();

    /**
   * Handles the form submission
   * @param {LoginRequest} req - The login request
   */
    const onSubmit = async (req: LoginRequest) => {
        try {
            dispatch(setTfaUsername(req.username));
            const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
            loginRequest({ ...req, grecaptchaToken });
        } catch (error) {
            toast.error(JSON.stringify(error));
            console.error(error);
        }
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            try {
                if (data.isTFAPending) {
                    dispatch(setTfaPending(true));
                    navigate("/tfa/validate", { replace: true });
                } else {
                    const activeUser = getActiveUserFromCookies();
                    if (activeUser === null) {
                        throw new Error("Active user is null");
                    }
                    dispatch(setTfaPending(false));
                    dispatch(login(activeUser));
                    navigate("/cpanel/dashboard", { replace: true });
                    toast(t("welcome", { username: tfaUsername }));
                }
            } catch (error) {
                toast.error(JSON.stringify(error));
                console.error(error);
            }
        }
    }, [status, error, data]);

    return { onSubmit, isLoading, tfaUsername };
}