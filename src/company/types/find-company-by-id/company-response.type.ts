import { User } from "../../../users/types/user.type";
import { Company } from "../company.type";

export type CompanyResponse = {
    company: Company;
    users: User[];
    totalUsers: number;
    customers: User[];
    totalCustomers: number;
}