import { Language } from "./language.type";
import { Overlay } from "./overlay.type";
import { ThemeType } from "./theme.type";

export type CommonState = {
    overlay: Overlay,
    language: Language,
    theme: ThemeType,
}