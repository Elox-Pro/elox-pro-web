import { Company } from "../types/company.type";

export type CompanyListState = {
    items: Company[],
    selected: Company | null
}