import { Company } from "../types/company.type"

export type FindCompaniesResponse = {
    companies: Company[],
    total:number
}