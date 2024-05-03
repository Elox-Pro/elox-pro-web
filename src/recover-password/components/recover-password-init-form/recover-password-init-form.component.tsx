import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks/app.hooks";
import { RecoverPasswordInitRequest } from "../../types/recover-password-init/recover-password-init-request.type";
import { recoverPasswordInitSchema } from "../../schemas/recover-password-init.schema";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { useNavigate } from "react-router-dom";
import { useInitRequestMutation } from "../../api/recover-password.api";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { FieldError } from "react-hook-form";
import { setTfaPending, setTfaUsername } from "../../../tfa/features/tfa.slice";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";

/**
 * Renders the Recover Password Init Form component.
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} The Recover Password Init Form component.
 */
export default function RecoverPasswordInitForm() {
  const { t } = useTranslation("recover-password", { keyPrefix: "init" })
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useZodForm<RecoverPasswordInitRequest>(recoverPasswordInitSchema);
  const navigate = useNavigate();
  const [initRequest, { status, error }] = useInitRequestMutation();
  const grecaptcha = useGRecaptcha();
  const [disabled, setDisabled] = useState(false);

  /**
   * Handles the form submission.
   * @param {RecoverPasswordInitRequest} req - The recover password init request object.
   * @returns {Promise<void>} - A Promise that resolves when the request is complete.
   */
  const onSubmit = async (req: RecoverPasswordInitRequest) => {
    try {
      onInitRequest(req.username);
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
      initRequest({ ...req, grecaptchaToken });
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
  }, [status, error]);

  /**
   * Initializes the recover password init request.
   * @param {string} username - The username to be set.
   * @returns {void}
   */
  const onInitRequest = (username: string) => {
    dispatch(setOverlay(true));
    dispatch(setTfaUsername(username));
    setDisabled(true);
  };

  /**
   * Handles an error during the recover password init request.
   * @param {any} error - The error object.
   * @returns {void}
   */
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaUsername(""));
    toast.error(t("error.on-request"));
    console.error("Recover Password Init Error:", error);
  };

  /**
   * Handles a rejected recover password init request.
   * @returns {void}
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaUsername(""));
    handleRejected({ error, message: "Recover Password Init Rejected" });
  };

  /**
   * Handles a successful recover password init request.
   * @returns {void}
   */
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaPending(true));
    navigate("/tfa/validate", { replace: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <IconInput
          type="text"
          name="username"
          label={t("username.label")}
          placeholder={t("username.placeholder")}
          icon="bi bi-person"
          register={register}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={disabled}
          autoComplete="username"
        />
        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>
    </>
  );
}