import { z, ZodType } from "zod"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"
import { UpdatePasswordRequest } from "../types/update-password/update-password-request.type"

export const updatePasswordSchema: ZodType<UpdatePasswordRequest> = z.object({
    currentPassword: z.
        string()
        .min(3, { message: ZodErrorKey.required }),
    newPassword: z
        .string()
        .min(3, { message: ZodErrorKey.required }),
    confirmPassword: z
        .string()
        .min(3, { message: ZodErrorKey.required }),
}).refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: ZodErrorKey.passwordsDoNotMatch,
    path: ["confirmPassword"]
});
