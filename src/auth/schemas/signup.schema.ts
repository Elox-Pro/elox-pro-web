import { z, ZodType } from "zod"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"
import { SignupRequest } from "../types/signup/signup-request.type"


export const signupSchema: ZodType<SignupRequest> = z.object({
    username: z.
        string()
        .min(3, { message: ZodErrorKey.required }),
    email: z
        .string()
        .min(3, { message: ZodErrorKey.required })
        .email({ message: ZodErrorKey.invalidEmail }),
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
