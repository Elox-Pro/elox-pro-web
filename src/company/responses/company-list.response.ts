import { Company } from "../types/company.type"

export type CompanyListResponse = {
    companies: Company[],
    total:number
}