import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useZodForm } from "../../../common/hooks/zod-form.hook"
import { useNavigate } from "react-router-dom"
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import IconInput from "../../../common/components/icon-input/icon-input.component"
import { FieldError } from "react-hook-form"
import { RecoverPasswordResetRequest } from "../../types/recover-password-reset/recover-password-reset-request.type"
import { recoverPasswordResetSchema } from "../../schemas/recover-password-reset.schema"
import { useResetMutation } from "../../api/recover-password.api"
import { setResetFormEnabled } from "../../features/recover-password.slice"
import { toast } from "react-toastify"
import SubmitButton from "../../../common/components/submit-button/submit-button"
import { setOverlay } from "../../../common/features/common.slice"

export default function RecoverPasswordResetForm() {
  const { t } = useTranslation("recover-password", { keyPrefix: "reset" })
  const dispatch = useAppDispatch()
  const { register, handleSubmit, errors } = useZodForm<RecoverPasswordResetRequest>(recoverPasswordResetSchema)
  const navigate = useNavigate()
  const [mutation, { status }] = useResetMutation()
  const grecaptcha = useGRecaptcha()
  const { tfaUsername } = useAppSelector((state) => state.tfa)
  const { overlay } = useAppSelector((state) => state.common)

  const onSubmit = async (req: RecoverPasswordResetRequest) => {
    try {
      dispatch(setOverlay(true))
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha)
      mutation({ ...req, grecaptchaToken })
    } catch (error) {
      console.error(error)
      toast.error(JSON.stringify(error))
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setResetFormEnabled(false))
      navigate("/auth/signin", { replace: true })
      toast.success(t("success.message"))
    }
  }, [status])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
      <IconInput
        type="text"
        name="username"
        label={t("username.label")}
        placeholder={t("username.placeholder")}
        icon="bi bi-person"
        register={register}
        error={errors.username as FieldError}
        defaultValue={tfaUsername}
        readOnly={true}
        autoComplete="username"
      />

      <IconInput
        type="password"
        name="password1"
        label={t("password.label")}
        placeholder={t("password.placeholder")}
        icon="bi bi-lock"
        register={register}
        error={errors.password1 as FieldError}
        autoFocus={true}
        disabled={overlay.active}
        autoComplete="new-password"
      />

      <IconInput
        type="password"
        name="password2"
        label={t("password.label")}
        placeholder={t("password.placeholder")}
        icon="bi bi-lock"
        register={register}
        error={errors.password2 as FieldError}
        disabled={overlay.active}
        autoComplete="new-password"
      />

      <div className="input-group mb-3">
        <SubmitButton disabled={overlay.active} />
      </div>
    </form>
  )
}
