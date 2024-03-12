import { z, ZodType } from "zod"
import { ValidateTfaRequest } from "../types/validate-tfa/validate-tfa-request.type"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"

export const validateTfaSchema: ZodType<ValidateTfaRequest> = z.object({
    username: z.string().min(3, { message: ZodErrorKey.required }),
    code: z.string().min(6, { message: ZodErrorKey.required })
})