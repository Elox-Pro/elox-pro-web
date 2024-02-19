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
import { useAuth } from "../providers/auth-provider.component"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormRequest>({
    resolver: zodResolver(loginFormSchema),
  })

  const authContext = useAuth()
  const navigate = useNavigate()
  const inputs = useLoginFormInputs(register, errors)
  const [loginRequest, response] = useLoginRequestMutation()

  const onSubmit = (request: LoginFormRequest) => {
    loginRequest(request)
  }

  useEffect(() => {
    if (response.status === QueryStatus.fulfilled && authContext) {
      authContext.setLogin(response.data.tokens)
      navigate("/dashboard/home", { replace: true })
    }
  }, [response])

  return (
    <>
      <div className="text-center">
        <h3 className="text-body-highlight">Iniciar Sesión</h3>
        <p className="text-body-tertiary">Obtenga acceso a su cuenta</p>
      </div>

      <AlertError status={response.status} error={response.error} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        {inputs.map((input, index) => (
          <Input {...input} key={index} />
        ))}

        <p className="text-end">
          <a className="fw-semibold" href="#">
            <small>¿Has olvidado tu contraseña?</small>
          </a>
        </p>

        <div className="input-group mb-3">
          <ProgressButton type="submit" color="primary" status={response.status} text="Enviar" />
        </div>
      </form>
    </>
  )
}
