import { z, ZodType } from "zod"
import { LoginRequest } from "../types/login/login-request.type"

const requiredError = "Este campo es requerido."

export const loginSchema: ZodType<LoginRequest> = z.object({
    username: z.string().min(3, { message: requiredError }),
    password: z.string().min(3, { message: requiredError }),
})