import { User } from "../../users/types/user.type";
import { Company } from "../types/company.type";

export type CompanyState = {
    companies: Company[];
    company: Company | null;
    companyUsers: User[];
    totalCompanyUsers: number;
    companyUser: User | null;
    showEditCompanyNameModal: boolean;
    showCreateCompanyModal: boolean;
    showManageCompanyUserModal: boolean;
}