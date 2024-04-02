import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import { useZod } from "../../../common/hooks/zod.hook"
import { useNavigate } from "react-router-dom"
import { useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../app/constants/app.constants"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import Input from "../../../common/components/input/input.component"
import { FieldError } from "react-hook-form"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { RecoverPasswordResetRequest } from "../../types/recover-password-reset/recover-password-reset-request.type"
import { recoverPasswordResetSchema } from "../../schemas/recover-password-reset.schema"
import { useResetRequestMutation } from "../../api/recover-password.api"
import { setResetPasswordSuccess, setResetFormEnabled } from "../../features/recover-password.slice"

export default function RecoverPasswordResetForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<RecoverPasswordResetRequest>(recoverPasswordResetSchema)
  const navigate = useNavigate()
  const [resetRequest, { status, error }] = useResetRequestMutation()
  const grecaptcha = useGRecaptcha(GOOGLE_RECAPTCHA_SITE_KEY)
  const { username } = useAppSelector((state) => state.tfa)

  const onSubmit = async (request: RecoverPasswordResetRequest) => {
    try {
      if (!grecaptcha) {
        throw new Error(t("auth:recaptcha_error"))
      }
      const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      if (!token) {
        throw new Error(t("auth:recaptcha_error"))
      }
      resetRequest({ ...request, grecaptchaToken: token })
    } catch (error) {
      console.error("Recover password Reset Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setResetFormEnabled(false))
      dispatch(setResetPasswordSuccess(true))
      navigate("/auth/signin", { replace: true })
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
          defaultValue={username}
          readonly={true}
        />

        <Input
          type="password"
          name="password1"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
          autofocus={true}
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
