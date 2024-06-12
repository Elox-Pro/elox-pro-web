import { TfaType } from "../../tfa/enums/validate-tfa/tfa-type.enum"
import { Gender } from "../enum/gender.enum";

export type User = {

    id: number;
    updatedAt: Date | null;
    createdAt: Date | null;

    role: string | null;
    roleText: string | null;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;

    gender: string | null;
    genderText: string | null;

    avatarUrl: Gender | null;

    // Flat indication email verification status
    emailVerified: boolean | false;

    // Flag indicating phone verification status
    phoneVerified: boolean | false;

    // The TFA authentication type to 
    tfaType: TfaType | null;
    tfaTypeText: string | null;

    // Last login timestamp
    lastLoginAt: Date | null;

    // The user language
    lang: string | null;
    langText: string | null;

    // The UI user theme
    theme: string | null;
    themeText: string | null;
}