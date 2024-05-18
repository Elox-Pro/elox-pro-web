import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { getGRecaptchaToken, useGRecaptcha } from "../../common/hooks/grecaptcha.hook";
import { useLoginMutation } from "../api/auth.api";
import { LoginRequest } from "../types/login/login-request.type";
import { setTfaPending, setTfaUsername } from "../../tfa/features/tfa.slice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../common/hooks/zod-form.hook";
import { loginSchema } from "../schemas/login.schema";
import useLogin from "./login.hook";
import { setOverlay } from "../../common/features/common.slice";

/**
 * Custom hook for handling the login functionality.
 * @module useLoginHandler
 * @returns {Object} An object containing the necessary functions and state for login handling.
 */
export default function useLoginHandler() {
    const dispatch = useAppDispatch();
    const grecaptcha = useGRecaptcha();
    const navigate = useNavigate();
    const { tfaUsername } = useAppSelector((state) => state.tfa);
    const { t } = useTranslation("auth", { keyPrefix: "login" });
    const zodForm = useZodForm<LoginRequest>(loginSchema);
    const { overlay } = useAppSelector((state) => state.common);
    const [mutation, { data, status }] = useLoginMutation();
    const { handleLogin } = useLogin();

    /**
   * Handles the form submission
   * @param {LoginRequest} req - The login request
   */
    const onSubmit = async (req: LoginRequest) => {
        try {
            dispatch(setOverlay(true));
            dispatch(setTfaUsername(req.username));
            const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
            mutation({ ...req, grecaptchaToken });
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
                    handleLogin();
                }
            } catch (error) {
                toast.error(JSON.stringify(error));
                console.error(error);
            }
        }
    }, [status, data]);

    return { onSubmit, overlay, tfaUsername, t, zodForm };
}