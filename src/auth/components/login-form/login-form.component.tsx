import { FieldError } from "react-hook-form"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { loginSchema } from "../../schemas/login.schema"
import { LoginRequest } from "../../types/login/login-request.type"
import Input from "../../../common/components/input/input.component"
import { useLoginRequestMutation } from "../../api/auth.api"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useAuth } from "../../providers/auth.provider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useZod } from "../../../common/hooks/zod.hook"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setSignupSuccess } from "../../feautures/auth.slice"
import { setUsername, setTfaPending } from "../../../tfa/features/tfa.slice"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../app/constants/app.constants"
import { useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import AuthLink from "../auth-link/auth-link.component"

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema)
  const authContext = useAuth()
  const navigate = useNavigate()
  const { createSession } = authContext
  const [loginRequest, { data, status, error }] = useLoginRequestMutation()
  const grecaptcha = useGRecaptcha(GOOGLE_RECAPTCHA_SITE_KEY)
  const { username } = useAppSelector((state) => state.tfa)

  const onSubmit = async (request: LoginRequest) => {
    try {
      if (!grecaptcha) {
        throw new Error(t("auth:recaptcha_error"))
      }
      const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      if (!token) {
        throw new Error(t("auth:recaptcha_error"))
      }
      dispatch(setUsername(request.username))
      loginRequest({ ...request, grecaptchaToken: token })
    } catch (error) {
      console.error("Login Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setSignupSuccess(false))

      if (data?.isTFAPending) {
        dispatch(setTfaPending(true))
        navigate("/tfa/validate", { replace: true })
      } else {
        dispatch(setTfaPending(false))
        dispatch(setUsername(""))
        createSession()
        navigate("/dashboard/home", { replace: true })
      }
    }
  }, [status])

  return (
    <>
      <AlertError status={status} error={error} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <Input
          type="text"
          name="username"
          label={t("auth:username_label")}
          placeholder={t("auth:username_placeholder")}
          icon="bi bi-person"
          register={register}
          defaultValue={username}
          error={errors.username as FieldError}
          autofocus={true}
        />

        <Input
          type="password"
          name="password"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
        />

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("auth:forgot_password")} to={"/recover-password/init"} />
      </p>
    </>
  )
}
