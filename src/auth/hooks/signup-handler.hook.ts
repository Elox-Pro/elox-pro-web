import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks/app.hooks";
import { useZodForm } from "../../common/hooks/zod-form.hook";
import { SignupRequest } from "../types/signup/signup-request.type";
import { signupSchema } from "../schemas/signup.schema";
import { useSignupMutation } from "../api/auth.api";
import { getGRecaptchaToken, useGRecaptcha } from "../../common/hooks/grecaptcha.hook";
import { setTfaPending, setTfaUsername } from "../../tfa/features/tfa.slice";

export default function useSignupHandler() {

    const dispatch = useAppDispatch();
    const { t } = useTranslation("auth", { keyPrefix: "signup" })
    const zodForm = useZodForm<SignupRequest>(signupSchema);
    const navigate = useNavigate();
    const [mutation, { data, status, error, isLoading }] = useSignupMutation();
    const grecaptcha = useGRecaptcha();

    /**
     * Handles the form submission.
     * @param {SignupRequest} req - The signup request object.
     * @returns {Promise<void>} - A Promise that resolves when the request is complete.
     */
    const onSubmit = async (req: SignupRequest) => {
        try {
            dispatch(setTfaUsername(req.username));
            const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
            mutation({ ...req, grecaptchaToken });
        } catch (error) {
            toast.error(JSON.stringify(error));
            console.error(error);
        }
    };

    useEffect(() => {
        if (data && status === QueryStatus.fulfilled) {
            if (data.isTFAPending) {
                dispatch(setTfaPending(true));
                navigate("/tfa/validate", { replace: true });
            } else {
                dispatch(setTfaPending(false));
                navigate("/auth/signin", { replace: true });
                toast.success(t("success.message"));
            }
        }
    }, [status, error, data]);

    return {
        onSubmit, zodForm, isLoading, t
    }

}