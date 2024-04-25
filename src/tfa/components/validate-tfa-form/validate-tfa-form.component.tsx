import { useTranslation } from "react-i18next";
import { ValidateTfaRequest } from "../../types/validate-tfa/validate-tfa-request.type";
import { FieldError, get } from "react-hook-form";
import { validateTfaSchema } from "../../schemas/validate-tfa.schema";
import { useNavigate } from "react-router-dom";
import { useValidateTfaRequestMutation } from "../../api/tfa.api";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useZod } from "../../../common/hooks/zod.hook";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setTfaPending } from "../../features/tfa.slice";
import { TfaAction } from "../../enums/validate-tfa/tfa-action.enum";
import { setResetFormEnabled } from "../../../recover-password/features/recover-password.slice";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import { login } from "../../../auth/features/auth.slice";
import { getActiveUserFromCookies } from "../../../auth/helpers/get-active-user-from-cookies.helper";
import { setProfile } from "../../../profile/features/profile.slice";

/**
 * Renders the Validate TFA Form component.
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} The Validate TFA Form component.
 */
export default function ValidateTfaForm() {
  const { t } = useTranslation("tfa", { keyPrefix: "validate-tfa" })
  const { tfaUsername: username } = useAppSelector((state) => state.tfa);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useZod<ValidateTfaRequest>(validateTfaSchema);
  const navigate = useNavigate();
  const [validateTfaRequest, { data, status, error }] = useValidateTfaRequestMutation();
  const [disabled, setDisabled] = useState(false);

  /**
   * Handles the form submission.
   * @param {ValidateTfaRequest} req - The validate TFA request object.
   * @returns {void}
   */
  const onSubmit = (req: ValidateTfaRequest) => {
    try {
      onInitRequest();
      validateTfaRequest(req);
    } catch (error) {
      onErrorRequest(error);
    }
  };

  useEffect(() => {
    switch (status) {
      case QueryStatus.rejected:
        onRejected();
        break;
      case QueryStatus.fulfilled:
        onFulfilled();
        break;
        default: break
    }
  }, [status, error, data]);

  /**
   * Initializes the validate TFA request.
   * @returns {void}
   */
  const onInitRequest = () => {
    dispatch(setOverlay(true));
    setDisabled(true);
  };

  /**
   * Handles an error during the validate TFA request.
   * @param {any} error - The error object.
   * @returns {void}
   */
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    toast.error(t("error.on-request"));
    console.error("Validate TFA Error:", error);
  };

  /**
   * Handles a rejected validate TFA request.
   * @returns {void}
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    handleRejected({ error, message: "Validate TFA Rejected" });
  };

  /**
   * Handles a successful validate TFA request.
   * @returns {void}
   */
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    dispatch(setTfaPending(false));
    setDisabled(false);
    if (!data || !data.action) {
      return;
    }
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
      default:
        console.warn("Unhandled TFA action:", data.action);
        break;
    }
  };

  /**
   * Handles the sign-in action.
   * @returns {void}
   */
  const signinAction = () => {
    try {
      const activeUser = getActiveUserFromCookies();
      if (activeUser === null) {
        throw new Error("Active user is null");
      }
      dispatch(login(activeUser));
      navigate("/cpanel/dashboard", { replace: true });
      toast(t("success.signin", { username }));
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


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <IconInput
          type="text"
          name="username"
          label={t("username.label")}
          placeholder={t("username.placeholder")}
          icon="bi bi-person"
          readOnly={true}
          register={register}
          error={errors.username as FieldError}
          value={username}
        />

        <IconInput
          type="text"
          name="code"
          label={t("validate-code.label")}
          placeholder={t("validate-code.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.code as FieldError}
          autoFocus={true}
          disabled={disabled}
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>
    </>
  );
}
