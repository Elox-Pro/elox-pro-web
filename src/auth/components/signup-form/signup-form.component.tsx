import { FieldError } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useSignupRequestMutation } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import { useAppDispatch } from "../../../app/hooks/app.hooks";
import { setUsername, setTfaPending } from "../../../tfa/features/tfa.slice";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import { SignupRequest } from "../../types/signup/signup-request.type";
import { signupSchema } from "../../schemas/signup.schema";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { handleError } from "../../../common/helpers/handle-error.helper";
import SubmitButton from "../../../common/components/submit-button/submit-button";

/**
 * Renders the Signup Form component.
 * @returns {JSX.Element} The Signup Form component.
 */
export default function SignupForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "auth"]);
  const { register, handleSubmit, errors } = useZod<SignupRequest>(signupSchema);
  const navigate = useNavigate();
  const [signupRequest, { data, status, error }] = useSignupRequestMutation();
  const grecaptcha = useGRecaptcha();
  const [disabled, setDisabled] = useState(false);

  /**
   * Handles the form submission.
   * @param {SignupRequest} req - The signup request object.
   * @returns {Promise<void>} - A Promise that resolves when the request is complete.
   */
  const onSubmit = async (req: SignupRequest) => {
    try {
      onInitRequest(req.username);
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
      signupRequest({ ...req, grecaptchaToken });
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
   * Initializes the signup request.
   * @param {string} username - The username to be set.
   * @returns {void}
   */
  const onInitRequest = (username: string) => {
    dispatch(setOverlay(true));
    dispatch(setUsername(username));
    setDisabled(true);
  };

  /**
   * Handles an error during the signup request.
   * @param {any} error - The error object.
   * @returns {void}
   */
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setUsername(""));
    toast.error("Error submitting signup request");
    console.error("Signup Error:", error);
  };

  /**
   * Handles a rejected signup request.
   * @returns {void}
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setUsername(""));
    const res = handleError(error);
    toast.error(res.message);
    console.error("Signup Rejected:", res);
  };

  /**
   * Handles a successful signup request.
   * @returns {void}
   */
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    if (!data) {
      return;
    }
    if (data.isTFAPending) {
      dispatch(setTfaPending(true));
      navigate("/tfa/validate", { replace: true });
    } else {
      dispatch(setTfaPending(false));
      navigate("/auth/signin", { replace: true });
    }
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
          register={register}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={disabled}
        />

        <IconInput
          type="email"
          name="email"
          label={t("auth:email_label")}
          placeholder={t("auth:email_placeholder")}
          icon="bi bi-envelope"
          register={register}
          error={errors.email as FieldError}
          disabled={disabled}
        />

        <IconInput
          type="password"
          name="password1"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
          disabled={disabled}
        />

        <IconInput
          type="password"
          name="password2"
          label={t("auth:confirm_password_label")}
          placeholder={t("auth:confirm_password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password2 as FieldError}
          disabled={disabled}
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>
    </>
  );
}