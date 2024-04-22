import { z, ZodType } from "zod"
import { ZodErrorKey } from "../../app/constants/zod-error.constants"
import { UpdateNameRequest } from "../types/update-name/update-name-request.type";


export const updateNameSchema: ZodType<UpdateNameRequest> = z.object({
    firstName: z.
        string()
        .min(3, { message: ZodErrorKey.required }),
    lastName: z
        .string()
        .min(3, { message: ZodErrorKey.required })
})
