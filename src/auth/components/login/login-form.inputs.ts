import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginFormRequest } from "./login-form-request.type"

export const useLoginFormInputs = (
    register: UseFormRegister<LoginFormRequest>,
    errors: FieldErrors) => {
    return [
        {
            type: "text",
            name: "username",
            label: "Usuario",
            placeholder: "Ingrese usuario",
            icon: "bi bi-person",
            register: register,
            error: errors.username as FieldError,
            autofocus: true,
        },
        {
            type: "password",
            name: "password",
            label: "Contraseña",
            placeholder: "Ingrese contraseña",
            icon: "bi bi-lock",
            register: register,
            error: errors.password as FieldError,
        },
    ]
}


