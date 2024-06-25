import { User } from "../../users/types/user.type";
import { Company } from "../types/company.type";

export type FindCompanyResponse = {
    company: Company;
    users: User[];
    totalUsers: number;
    customers: User[];
    totalCustomers: number;
}