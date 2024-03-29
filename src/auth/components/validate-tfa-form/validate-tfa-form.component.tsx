import { useTranslation } from "react-i18next"
import { ValidateTfaRequest } from "../../types/validate-tfa/validate-tfa-request.type"
import { FieldError } from "react-hook-form"
import { validateTfaSchema } from "../../schemas/validate-tfa.schema"
import { useAuth } from "../../providers/auth.provider"
import { useNavigate } from "react-router-dom"
import { useValidateTfaRequestMutation } from "../../api/auth.api"
import { useEffect } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import Input from "../../../common/components/input/input.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useZod } from "../../../common/hooks/zod.hook"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setIsTfaPending } from "../../feautures/login.slice"

export default function ValidateTfaForm() {
  const { username } = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "login"])
  const { register, handleSubmit, errors } = useZod<ValidateTfaRequest>(validateTfaSchema)
  const authContext = useAuth()
  const navigate = useNavigate()
  const { createSession } = authContext
  const [validateTfaRequest, { status, error }] = useValidateTfaRequestMutation()

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
      createSession()
      navigate("/dashboard/home", { replace: true })
    }
  }, [status])

  return (
    <>
      <AlertError status={status} error={error} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <Input
          type="text"
          name="username"
          label={t("login:username_label")}
          placeholder={t("login:username_placeholder")}
          icon="bi bi-person"
          readonly={true}
          register={register}
          error={errors.username as FieldError}
          value={username}
        />

        <Input
          type="text"
          name="code"
          label={t("login:tfa_label")}
          placeholder={t("login:tfa_placeholder")}
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
