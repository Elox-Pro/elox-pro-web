import { ZodType, z } from "zod";
import { RecoverPasswordInitRequest } from "../types/recover-password-init/recover-password-init-request.type";
import { ZodErrorKey } from "../../app/constants/zod-error.constants";

export const recoverPasswordInitSchema: ZodType<RecoverPasswordInitRequest> = z.object({
    username: z.string().min(3, { message: ZodErrorKey.required }),
});