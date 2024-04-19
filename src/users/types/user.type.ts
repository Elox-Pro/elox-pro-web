import { TfaType } from "../../tfa/enums/validate-tfa/tfa-type.enum"

export type User = {

    updatedAt: Date | null;
    createdAt: Date | null;

    role: string | null;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;

    gender: string | null;

    avatarUrl: string | null;

    // Flat indication email verification status
    emailVerified: boolean | false;

    // Flag indicating phone verification status
    phoneVerified: boolean | false;

    // The TFA authentication type to 
    tfaType: TfaType | null;

    // Last login timestamp
    lastLoginAt: Date | null;

    // The user language
    lang: string | null;

    // The UI user theme
    theme: string | null;
}