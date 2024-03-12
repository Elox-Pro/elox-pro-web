import { z, ZodType } from "zod"
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type"

const requiredError = "Este campo es requerido."

export const validateTfaSchema: ZodType<ValidateTfaRequest> = z.object({
    username: z.string().min(3, { message: requiredError }),
    code: z.string().min(6, { message: requiredError })
})