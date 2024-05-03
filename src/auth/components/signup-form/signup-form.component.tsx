import { FieldError } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useSignupRequestMutation } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { useAppDispatch } from "../../../app/hooks/app.hooks";
import { setTfaUsername, setTfaPending } from "../../../tfa/features/tfa.slice";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import { SignupRequest } from "../../types/signup/signup-request.type";
import { signupSchema } from "../../schemas/signup.schema";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";

/**
 * Renders the Signup Form component.
 * @returns {JSX.Element} The Signup Form component.
 */
export default function SignupForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("auth", { keyPrefix: "signup" })
  const { register, handleSubmit, errors } = useZodForm<SignupRequest>(signupSchema);
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
    dispatch(setTfaUsername(username));
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
    dispatch(setTfaUsername(""));
    toast.error(t("error.on-request"));
    console.error("Signup Error:", error);
  };

  /**
   * Handles a rejected signup request.
   * @returns {void}
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaUsername(""));
    handleRejected({ error, message: "Signup Rejected" });
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
      toast.success(t("success.message"));
    }
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

        <IconInput
          type="email"
          name="email"
          label={t("email.label")}
          placeholder={t("email.placeholder")}
          icon="bi bi-envelope"
          register={register}
          error={errors.email as FieldError}
          disabled={disabled}
        />

        <IconInput
          type="password"
          name="password1"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
          disabled={disabled}
          autoComplete="new-password"
        />

        <IconInput
          type="password"
          name="password2"
          label={t("confirm-password.label")}
          placeholder={t("confirm-password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password2 as FieldError}
          disabled={disabled}
          autoComplete="new-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>
    </>
  );
}