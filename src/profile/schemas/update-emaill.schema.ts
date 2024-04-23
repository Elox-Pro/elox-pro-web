import { z, ZodType } from "zod"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"
import { UpdateEmailRequest } from "../types/update-email/update-email-request.type";

export const updateEmailSchema: ZodType<UpdateEmailRequest> = z.object({
    email: z
        .string()
        .min(3, { message: ZodErrorKey.required })
        .email({ message: ZodErrorKey.invalidEmail }),
    currentEmail: z
        .string()
        .min(3, { message: ZodErrorKey.required })
        .email({ message: ZodErrorKey.invalidEmail }),
}).refine(({ email, currentEmail }) => email !== currentEmail, {
    message: ZodErrorKey.emailAlreadyExists,
    path: ["email"]
})
