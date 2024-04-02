import { useTranslation } from "react-i18next"
import { ValidateTfaRequest } from "../../types/validate-tfa/validate-tfa-request.type"
import { FieldError } from "react-hook-form"
import { validateTfaSchema } from "../../schemas/validate-tfa.schema"
import { useAuth } from "../../../auth/providers/auth.provider"
import { useNavigate } from "react-router-dom"
import { useValidateTfaRequestMutation } from "../../api/tfa.api"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import Input from "../../../common/components/input/input.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useZod } from "../../../common/hooks/zod.hook"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setIsSignupNotification } from "../../../auth/feautures/auth.slice"
import { setIsTfaPending } from "../../features/tfa.slice"
import { TfaAction } from "../../enums/validate-tfa/tfa-action.enum"
import { setIsResetFormEnabled } from "../../../recover-password/features/recover-password.slice"

export default function ValidateTfaForm() {
  const { username } = useAppSelector((state) => state.tfa)
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "tfa", "auth"])
  const { register, handleSubmit, errors } = useZod<ValidateTfaRequest>(validateTfaSchema)
  const authContext = useAuth()
  const navigate = useNavigate()
  const { createSession } = authContext
  const [validateTfaRequest, { data, status, error }] = useValidateTfaRequestMutation()

  const onSubmit = (request: ValidateTfaRequest) => {
    try {
      validateTfaRequest(request)
    } catch (error) {
      console.error("Tfa Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setIsTfaPending(false))
      if (data?.action === TfaAction.SIGN_IN) {
        createSession()
        navigate("/dashboard/home", { replace: true })
      } else if (data?.action === TfaAction.SIGN_UP) {
        dispatch(setIsSignupNotification(true))
        navigate("/auth/signin", { replace: true })
      } else if (data?.action === TfaAction.RECOVER_PASSWORD) {
        dispatch(setIsResetFormEnabled(true))
        navigate("/recover-password/reset", { replace: true })
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
          readonly={true}
          register={register}
          error={errors.username as FieldError}
          value={username}
        />

        <Input
          type="text"
          name="code"
          label={t("tfa:tfa_label")}
          placeholder={t("tfa:tfa_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.code as FieldError}
          autofocus={true}
        />

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>
    </>
  )
}
