import { FieldError } from "react-hook-form"
import { QueryStatus } from "@reduxjs/toolkit/query"
import Input from "../../../common/components/input/input.component"
import { useSignupRequestMutation } from "../../api/auth.api"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useZod } from "../../../common/hooks/zod.hook"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { setUsername } from "../../feautures/auth.slice"
import { setIsTfaPending } from "../../../tfa/features/tfa.slice"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../app/constants/app.constants"
import { useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import { SignupRequest } from "../../types/signup/signup-request.type"
import { signupSchema } from "../../schemas/signup.schema"

export default function SignupForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<SignupRequest>(signupSchema)
  const navigate = useNavigate()
  const [signupRequest, { data, status, error }] = useSignupRequestMutation()
  const grecaptcha = useGRecaptcha(GOOGLE_RECAPTCHA_SITE_KEY)

  const onSubmit = async (request: SignupRequest) => {
    try {
      if (!grecaptcha) {
        throw new Error(t("auth:recaptcha_error"))
      }
      const grecaptchaToken = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      if (!grecaptchaToken) {
        throw new Error(t("auth:recaptcha_error"))
      }
      dispatch(setUsername(request.username))
      signupRequest({ ...request, grecaptchaToken })
    } catch (error) {
      console.error("Sign up Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      if (data?.isTFAPending) {
        dispatch(setIsTfaPending(true))
        navigate("/tfa/validate", { replace: true })
      } else {
        navigate("/auth/signin", { replace: true })
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
          error={errors.username as FieldError}
          autofocus={true}
        />

        <Input
          type="email"
          name="email"
          label={t("auth:email_label")}
          placeholder={t("auth:email_placeholder")}
          icon="bi bi-envelope"
          register={register}
          error={errors.email as FieldError}
        />

        <Input
          type="password"
          name="password1"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
        />

        <Input
          type="password"
          name="password2"
          label={t("auth:confirm_password_label")}
          placeholder={t("auth:confirm_password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password2 as FieldError}
        />

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>
    </>
  )
}
