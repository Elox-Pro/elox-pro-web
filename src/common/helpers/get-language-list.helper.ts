import { Language } from "../types/language.type";

export function getLanguageList(): Language[] {
    return [{
        code: "en",
        flag: "us"
    }, {
        code: "es",
        flag: "es"
    }];
}