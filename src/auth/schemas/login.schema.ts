import { z, ZodType } from "zod"
import { LoginRequest } from "../types/login/login-request.type"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"


export const loginSchema: ZodType<LoginRequest> = z.object({
    username: z.string().min(3, { message: ZodErrorKey.required }),
    password: z.string().min(3, { message: ZodErrorKey.required }),
})