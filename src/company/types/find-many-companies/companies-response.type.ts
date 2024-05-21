import { Company } from "../company.type"

export type CompaniesResponse = {
    companies: Company[],
    total:number
}