import { z, ZodType } from "zod"
import { UpdateGenderRequest } from "../types/update-gender/update-gender-request.type";
import { Gender } from "../../users/enum/gender.enum";


export const updateGenderSchema: ZodType<UpdateGenderRequest> = z.object({
    gender: z.enum([Gender.MALE, Gender.FEMALE])
})
