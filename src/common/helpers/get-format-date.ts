import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "../constants/common.constants";

export function getFormatDate(date: Date | null): string {

    if (date === null) {
        return "N/A";
    }

    return new Date(date).toLocaleString(DEFAULT_LOCALE, DEFAULT_DATE_FORMAT);
}