import { FieldError } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { loginSchema } from "../../schemas/login.schema";
import { LoginRequest } from "../../types/login/login-request.type";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useLoginRequestMutation } from "../../api/auth.api";
import { useAuth } from "../../providers/auth.provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setUsername, setTfaPending } from "../../../tfa/features/tfa.slice";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import AuthLink from "../auth-link/auth-link.component";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from 'react-toastify';
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";

/**
 * LoginForm component
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} - The login form
 */
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "auth"]);
  const { username } = useAppSelector((state) => state.tfa);
  const grecaptcha = useGRecaptcha();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema);
  const [loginRequest, { data, status, error }] = useLoginRequestMutation();
  const navigate = useNavigate();
  const authContext = useAuth();

  /**
   * Handles the form submission
   * @param {LoginRequest} req - The login request
   */
  const onSubmit = async (req: LoginRequest) => {
    try {
      onInitRequest(req.username);
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
      loginRequest({ ...req, grecaptchaToken });
    } catch (error) {
      onErrorRequest(error);
    }
  };

  useEffect(() => {
    switch (status) {
      case QueryStatus.rejected: onRejected(); break;
      case QueryStatus.fulfilled: onFulfilled(); break;
    }
  }, [status, error, data]);

  /**
   * Initializes the login request
   * @param {string} username - The username
   */
  const onInitRequest = (username: string) => {
    dispatch(setOverlay(true));
    dispatch(setUsername(username));
    setDisabled(true);
  };

  /**
   * Handles errors during the login request
   * @param {any} error - The error
   */
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setUsername(""));
    toast.error("Error submitting login request");
    console.error("Login Error:", error);
  };

  /**
   * Handles a rejected login request
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setUsername(""));
    handleRejected({ error, message: "Login Rejected" });
  };

  /**
   * Handles a fulfilled login request
   */
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    if (!data) { return; }
    if (data.isTFAPending) {
      dispatch(setTfaPending(true));
      navigate("/tfa/validate", { replace: true });
    } else {
      dispatch(setTfaPending(false));
      authContext.createSession();
      navigate("/cpanel/dashboard", { replace: true });
      toast("Welcome back! " + username);
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
          defaultValue={username}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={disabled}
        />

        <IconInput
          type="password"
          name="password"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
          disabled={disabled}
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("auth:forgot_password")} to={"/recover-password/init"} />
      </p>
    </>
  );
}