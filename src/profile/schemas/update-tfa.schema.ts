import { z, ZodType } from "zod"
import { UpdateTfaRequest } from "../types/update-tfa/update-tfa-request.type";
import { TfaType } from "../../tfa/enums/validate-tfa/tfa-type.enum";

export const updateTfaSchema: ZodType<UpdateTfaRequest> = z.object({
    tfaType: z.enum([TfaType.NONE, TfaType.EMAIL])
})
