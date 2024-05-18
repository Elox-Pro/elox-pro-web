import { ZodType, z } from "zod";
import { RecoverPasswordResetRequest } from "../types/recover-password-reset/recover-password-reset-request.type";
import { ZodErrorKey } from "../../app/constants/zod-error.constants";

export const recoverPasswordResetSchema: ZodType<RecoverPasswordResetRequest> = z.object({
    username: z
        .string()
        .min(3, { message: ZodErrorKey.required }),
    password1: z
        .string()
        .min(3, { message: ZodErrorKey.required }),
    password2: z
        .string()
        .min(3, { message: ZodErrorKey.required }),
}).refine(({ password1, password2 }) => password1 === password2, {
    message: ZodErrorKey.passwordsDoNotMatch,
    path: ["password2"]
});