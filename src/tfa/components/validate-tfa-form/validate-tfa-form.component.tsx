import { useTranslation } from "react-i18next";
import { ValidateTfaRequest } from "../../types/validate-tfa/validate-tfa-request.type";
import { FieldError } from "react-hook-form";
import { validateTfaSchema } from "../../schemas/validate-tfa.schema";
import { useAuth } from "../../../auth/providers/auth.provider";
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

/**
 * Renders the Validate TFA Form component.
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} The Validate TFA Form component.
 */
export default function ValidateTfaForm() {
  const { username } = useAppSelector((state) => state.tfa);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "tfa", "auth"]);
  const { register, handleSubmit, errors } = useZod<ValidateTfaRequest>(validateTfaSchema);
  const authContext = useAuth();
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
    toast.error("Error submitting validate TFA request");
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
    authContext.createSession();
    navigate("/cpanel/dashboard", { replace: true });
    toast("Welcome back! " + username);
  };

  /**
   * Handles the sign-up action.
   * @returns {void}
   */
  const signupAction = () => {
    navigate("/auth/signin", { replace: true });
    toast.success("Sign up successful");
  };

  /**
   * Handles the recover password action.
   * @returns {void}
   */
  const recoverPasswordAction = () => {
    dispatch(setResetFormEnabled(true));
    navigate("/recover-password/reset", { replace: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <IconInput
          type="text"
          name="username"
          label={t("auth:username_label")}
          placeholder={t("auth:username_placeholder")}
          icon="bi bi-person"
          readOnly={true}
          register={register}
          error={errors.username as FieldError}
          value={username}
        />

        <IconInput
          type="text"
          name="code"
          label={t("tfa:tfa_label")}
          placeholder={t("tfa:tfa_placeholder")}
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