import { z, ZodType } from "zod"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"
import { UpdatePhoneRequest } from "../types/update-phone/update-phone-request.type"

export const updatePhoneSchema: ZodType<UpdatePhoneRequest> = z.object({
    phone: z
        .string()
        .min(10, { message: ZodErrorKey.required }),
    currentPhone: z
        .string()
}).refine(({ phone, currentPhone }) => phone !== currentPhone, {
    message: ZodErrorKey.phoneAlreadyExists,
    path: ["phone"]
})
