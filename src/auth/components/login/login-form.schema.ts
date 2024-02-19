import { z, ZodType } from "zod"
import { LoginFormRequest } from "./login-form-request.type"

const requiredError = "Este campo es requerido."

export const loginFormSchema: ZodType<LoginFormRequest> = z.object({
    username: z.string().min(3, { message: requiredError }),
    password: z.string().min(3, { message: requiredError }),
})