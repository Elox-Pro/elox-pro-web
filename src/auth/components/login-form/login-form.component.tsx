import { FieldError } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { loginSchema } from "../../schemas/login.schema";
import { LoginRequest } from "../../types/login/login-request.type";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useLoginRequestMutation } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setTfaUsername, setTfaPending } from "../../../tfa/features/tfa.slice";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import AuthLink from "../auth-link/auth-link.component";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from 'react-toastify';
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import { login } from "../../features/auth.slice";
import { getActiveUserFromCookies } from "../../helpers/get-active-user-from-cookies.helper";

/**
 * LoginForm component
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} - The login form
 */
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("auth", { keyPrefix: "login" });
  const { tfaUsername: username } = useAppSelector((state) => state.tfa);
  const grecaptcha = useGRecaptcha();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema);
  const [loginRequest, { data, status, error }] = useLoginRequestMutation();
  const navigate = useNavigate();

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
    dispatch(setTfaUsername(username));
    setDisabled(true);
  };

  /**
   * Handles errors during the login request
   * @param {any} error - The error
   */
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaUsername(""));
    toast.error(t("error.on-request"));
    console.error("Login Error:", error);
  };

  /**
   * Handles a rejected login request
   */
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setTfaUsername(""));
    handleRejected({ error, message: "Login Rejected" });
  };

  /**
   * Handles a fulfilled login request
   */
  const onFulfilled = () => {
    try {
      dispatch(setOverlay(false));
      setDisabled(false);
      if (!data) {
        return;
      }
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
        toast(t("welcome", { username }));
      }
    } catch (error) {
      toast.error(t("error.on-request"));
      console.error("Login Error:", error);
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
          defaultValue={username}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={disabled}
          autoComplete="username"
        />

        <IconInput
          type="password"
          name="password"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
          disabled={disabled}
          autoComplete="current-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("forgot-password")} to={"/recover-password/init"} />
      </p>
    </>
  );
}