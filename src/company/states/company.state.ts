import { User } from "../../users/types/user.type";
import { Company } from "../types/company.type";

export type CompanyState = {
    companies: Company[];
    company: Company | null;
    companyUsers: User[];
    totalCompanyUsers: number;
    companyUser: User | null;
    users: User[];
    totalUsers: number;
    showEditCompanyNameModal: boolean;
    showCreateCompanyModal: boolean;
    showManageCompanyUserModal: boolean;
    showAddUserToCompanyModal: boolean;
}