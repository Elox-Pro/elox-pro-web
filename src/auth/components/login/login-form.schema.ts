import { z, ZodType } from "zod"
import { LoginFormType } from "./login-form.type"

const requiredError = "Este campo es requerido."

export const loginFormSchema: ZodType<LoginFormType> = z.object({
    username: z.string().min(3, { message: requiredError }),
    password: z.string().min(3, { message: requiredError }),
})