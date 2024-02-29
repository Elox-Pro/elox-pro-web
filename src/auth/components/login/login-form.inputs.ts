import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginFormRequest } from "./login-form-request.type"
import { useTranslation } from "react-i18next"

export const useLoginFormInputs = (
    register: UseFormRegister<LoginFormRequest>,
    errors: FieldErrors
) => {

    const { t } = useTranslation(["login"])

    return [
        {
            type: "text",
            name: "username",
            label: t("login:username_label"),
            placeholder: t("login:username_placeholder"),
            icon: "bi bi-person",
            register: register,
            error: errors.username as FieldError,
            autofocus: true,
        },
        {
            type: "password",
            name: "password",
            label: t("login:password_label"),
            placeholder: t("login:password_placeholder"),
            icon: "bi bi-lock",
            register: register,
            error: errors.password as FieldError,
        },
    ]
}


