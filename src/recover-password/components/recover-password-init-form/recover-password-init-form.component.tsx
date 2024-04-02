import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import { RecoverPasswordInitRequest } from "../../types/recover-password-init/recover-password-init-request.type"
import { recoverPasswordInitSchema } from "../../schemas/recover-password-init.schemta"
import { useZod } from "../../../common/hooks/zod.hook"
import { useNavigate } from "react-router-dom"
import { useInitRequestMutation } from "../../api/recover-password.api"
import { useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../app/constants/app.constants"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import Input from "../../../common/components/input/input.component"
import { FieldError } from "react-hook-form"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { setTfaPending, setUsername } from "../../../tfa/features/tfa.slice"

export default function RecoverPasswordInitForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<RecoverPasswordInitRequest>(recoverPasswordInitSchema)
  const navigate = useNavigate()
  const [initRequest, { status, error }] = useInitRequestMutation()
  const grecaptcha = useGRecaptcha(GOOGLE_RECAPTCHA_SITE_KEY)

  const onSubmit = async (request: RecoverPasswordInitRequest) => {
    try {
      if (!grecaptcha) {
        throw new Error(t("auth:recaptcha_error"))
      }
      const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      if (!token) {
        throw new Error(t("auth:recaptcha_error"))
      }
      dispatch(setUsername(request.username))
      initRequest({ ...request, grecaptchaToken: token })
    } catch (error) {
      console.error("Recover password Init Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setTfaPending(true))
      navigate("/tfa/validate", { replace: true })
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

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>
    </>
  )
}
