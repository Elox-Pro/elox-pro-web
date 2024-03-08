import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { loginFormSchema } from "./login-form.schema"
import { LoginFormRequest } from "./login-form-request.type"
import Input from "../../../common/components/input/input.component"
import { useLoginFormInputs } from "./login-form.inputs"
import { useLoginRequestMutation } from "../../api/auth.api"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useAuth } from "../../providers/auth.provider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function LoginForm() {
  const { t } = useTranslation(["common", "login"])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormRequest>({
    resolver: zodResolver(loginFormSchema),
  })

  const authContext = useAuth()
  const { createSession } = authContext
  const navigate = useNavigate()
  const inputs = useLoginFormInputs(register, errors)
  const [loginRequest, { status, error }] = useLoginRequestMutation()

  const onSubmit = (request: LoginFormRequest) => {
    try {
      loginRequest(request)
    } catch (error) {
      console.error("Login Error:", error)
    }
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled && authContext) {
      createSession()
      navigate("/dashboard/home", { replace: true })
    }
  }, [status, authContext])

  return (
    <>
      <div className="text-center">
        <h3 className="text-body-highlight">{t("login:title")}</h3>
        <p className="text-body-tertiary">{t("login:description")}</p>
      </div>

      <AlertError status={status} error={error} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        {inputs.map((input, index) => (
          <Input {...input} key={index} />
        ))}

        <p className="text-end">
          <a className="fw-semibold" href="#">
            <small>{t("login:forgot_password")}</small>
          </a>
        </p>

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} />
        </div>
      </form>
    </>
  )
}
