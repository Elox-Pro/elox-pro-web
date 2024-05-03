import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { useZodForm } from "../../../common/hooks/zod-form.hook"
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
import SubmitButton from "../../../common/components/submit-button/submit-button"
import { handleRejected } from "../../../common/helpers/handle-rejected.helper"

export default function RecoverPasswordResetForm() {
  const { t } = useTranslation("recover-password", { keyPrefix: "reset" })
  const dispatch = useAppDispatch()
  const { register, handleSubmit, errors } = useZodForm<RecoverPasswordResetRequest>(recoverPasswordResetSchema)
  const navigate = useNavigate()
  const [resetRequest, { status, error }] = useResetRequestMutation()
  const grecaptcha = useGRecaptcha()
  const { tfaUsername: username } = useAppSelector((state) => state.tfa)
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
    toast.error(t("error.on-request"));
    console.error("Recover Password Reset Error:", error);
  }
  const onRejected = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    handleRejected({ error, message: "Recover Password Reset Rejected" });
  }
  const onFulfilled = () => {
    dispatch(setOverlay(false));
    setDisabled(false);
    dispatch(setResetFormEnabled(false))
    navigate("/auth/signin", { replace: true })
    toast.success(t("success.message"))
  }

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
          defaultValue={username}
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
          disabled={disabled}
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
          disabled={disabled}
          autoComplete="new-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={disabled} />
        </div>
      </form>
    </>
  )
}
