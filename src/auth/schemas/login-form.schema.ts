import { z, ZodType } from "zod"
import { LoginFormData } from "../types/login-form.data"

const requiredError = "Este campo es requerido."

export const loginFormSchema: ZodType<LoginFormData> = z.object({
    username: z.string().min(3, { message: requiredError }),
    password: z.string().min(3, { message: requiredError }),
})