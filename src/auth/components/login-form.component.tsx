import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema } from "../schemas/login-form.schema"
import { LoginFormData } from "../types/login-form.data"
import Input from "../../common/components/input.component"
import { useLoginFormInputs } from "../inputs/login-form.inputs"
import { useLoginMutation } from "../api/auth.api"
import AlertError from "../../common/components/alert-error.component"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const inputs = useLoginFormInputs(register, errors)

  const [login, response] = useLoginMutation()

  const onSubmit = async (data: LoginFormData) => {
    login(data)
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
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Enviar
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
