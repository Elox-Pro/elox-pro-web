import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { loginFormSchema } from "./login-form.schema"
import { LoginFormType } from "./login-form.type"
import Input from "../../../common/components/input/input.component"
import { useLoginFormInputs } from "./login-form.inputs"
import { useLoginMutation } from "../../api/auth.api"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const inputs = useLoginFormInputs(register, errors)

  const [login, response] = useLoginMutation()

  const onSubmit = async (data: LoginFormType) => {
    login(data)
  }

  if (response.status === QueryStatus.fulfilled) {
    console.log(response.data)
  }

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
