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
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { setUsername, setIsTfaPending } from "../../feautures/login.slice"

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "login"])
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema)
  const authContext = useAuth()
  const navigate = useNavigate()
  const { createSession } = authContext
  const [loginRequest, { data, status, error }] = useLoginRequestMutation()

  const onSubmit = (request: LoginRequest) => {
    try {
      dispatch(setUsername(request.username))
      loginRequest(request)
    } catch (error) {
      console.error("Login Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      if (data?.isTFAPending) {
        dispatch(setIsTfaPending(true))
      } else {
        setIsTfaPending(false)
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
          label={t("login:username_label")}
          placeholder={t("login:username_placeholder")}
          icon="bi bi-person"
          register={register}
          error={errors.username as FieldError}
          autofocus={true}
        />

        <Input
          type="password"
          name="password"
          label={t("login:password_label")}
          placeholder={t("login:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
        />

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>
    </>
  )
}
