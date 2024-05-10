import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { useZodForm } from "../../common/hooks/zod-form.hook";
import { useNavigate } from "react-router-dom";
import { useValidateTfaMutation } from "../api/tfa.api";
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type";
import { validateTfaSchema } from "../schemas/validate-tfa.schema";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { TfaAction } from "../enums/validate-tfa/tfa-action.enum";
import { getSession } from "../../auth/helpers/get-active-user-from-cookies.helper";
import { login } from "../../auth/features/auth.slice";
import { setResetFormEnabled } from "../../recover-password/features/recover-password.slice";
import { setProfile } from "../../profile/features/profile.slice";

export default function useValidateTfaHandler() {
    const { t } = useTranslation("tfa", { keyPrefix: "validate-tfa" })
    const { tfaUsername } = useAppSelector((state) => state.tfa);
    const dispatch = useAppDispatch();
    const zodForm = useZodForm<ValidateTfaRequest>(validateTfaSchema);
    const navigate = useNavigate();
    const [mutation, { data, status, isLoading }] = useValidateTfaMutation();

    /**
     * Handles the form submission.
     * @param {ValidateTfaRequest} req - The validate TFA request object.
     * @returns {void}
     */
    const onSubmit = (req: ValidateTfaRequest) => {
        try {
            mutation(req);
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    };

    useEffect(() => {
        if (data && data.action) {
            switch (data.action) {
                case TfaAction.SIGN_IN:
                    signinAction();
                    break;
                case TfaAction.SIGN_UP:
                    signupAction();
                    break;
                case TfaAction.RECOVER_PASSWORD:
                    recoverPasswordAction();
                    break;
                case TfaAction.UPDATE_EMAIL:
                    updateEmailAction();
                    break;
                case TfaAction.UPDATE_PASSWORD:
                    updatePasswordAction();
                    break;
                default:
                    console.warn("Unhandled TFA action:", data.action);
                    break;
            }
        }
    }, [status, data]);


    /**
     * Handles the sign-in action.
     * @returns {void}
     */
    const signinAction = () => {
        try {
            const activeUser = getSession();
            if (activeUser === null) {
                throw new Error("Active user is null");
            }
            dispatch(login(activeUser));
            navigate("/cpanel/dashboard", { replace: true });
            toast(t("success.signin", { username: tfaUsername }));
        } catch (error) {
            toast.error(t("error.on-request"));
            console.error("Login Error:", error);
        }
    };

    /**
     * Handles the sign-up action.
     * @returns {void}
     */
    const signupAction = () => {
        navigate("/auth/signin", { replace: true });
        toast.success(t("success.signup"));
    };

    /**
     * Handles the recover password action.
     * @returns {void}
     */
    const recoverPasswordAction = () => {
        dispatch(setResetFormEnabled(true));
        navigate("/recover-password/reset", { replace: true });
    };

    /**
     * Handles the update email action.
     * @returns {void}
     */
    function updateEmailAction() {
        dispatch(setProfile(null));// clear profile to force refresh the profile page
        navigate("/cpanel/profile/", { replace: true });
        toast.success(t("success.update-email"));
    }

    /**
     * Handles the update password action.
     * @returns {void}
     */
    function updatePasswordAction() {
        navigate("/cpanel/profile/", { replace: true });
        toast.success(t("success.update-password"));
    }

    return {
        onSubmit, zodForm, isLoading, tfaUsername, t
    }
}