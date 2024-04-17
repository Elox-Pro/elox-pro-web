import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useZod } from "../../../common/hooks/zod.hook"
import { useNavigate } from "react-router-dom"
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import { useEffect, useState } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import IconInput from "../../../common/components/icon-input/icon-input.component"
import { FieldError } from "react-hook-form"
import { RecoverPasswordResetRequest } from "../../types/recover-password-reset/recover-password-reset-request.type"
import { recoverPasswordResetSchema } from "../../schemas/recover-password-reset.schema"
import { useResetRequestMutation } from "../../api/recover-password.api"
import { setResetFormEnabled } from "../../features/recover-password.slice"
import { setOverlay } from "../../../common/features/common.slice"
import { toast } from "react-toastify"
import { handleError } from "../../../common/helpers/handle-error.helper"
import SubmitButton from "../../../common/components/submit-button/submit-button"

export default function RecoverPasswordResetForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<RecoverPasswordResetRequest>(recoverPasswordResetSchema)
  const navigate = useNavigate()
  const [resetRequest, { status, error }] = useResetRequestMutation()
  const grecaptcha = useGRecaptcha()
  const { username } = useAppSelector((state) => state.tfa)
  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (request: RecoverPasswordResetRequest) => {
    try {
      onInitRequest()
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha)
      resetRequest({ ...request, grecaptchaToken })
    } catch (error) {
      onErrorRequest(error)
    }
  }

  useEffect(() => {
    switch (status) {
      case QueryStatus.rejected:
        onRejected();
        break;
      case QueryStatus.fulfilled:
        onFulfilled();
        break;
    }
  }, [status, error])

  const onInitRequest = () => {
    dispatch(setOverlay(true))
    setDisabled(true)
  }
  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false));
    setDisabled(false);
    toast.error("Error submitting recover password reset request");
    console.error("Recover Password Reset Error:", error);
  }
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    const res = handleError(error);
    toast.error(res.message);
    console.error("Recover Password Reset Rejected:", res);
  }
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setResetFormEnabled(false))
    navigate("/auth/signin", { replace: true })
    toast.success("Password reset successfully.")
  }

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
          defaultValue={username}
          readOnly={true}
        />

        <IconInput
          type="password"
          name="password1"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
          autoFocus={true}
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
  )
}
