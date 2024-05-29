import { Company } from "./company.type";

export type CompanyState = {
    list: Company[],
    selected: Company | null,
    manageModal: boolean,
}