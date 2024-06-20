import { User } from "../../users/types/user.type";
import { Company } from "../types/company.type";

export type CompanyInfoPageState = {
    company: Company | null;
    users: User[];
    totalUsers: number;
    customers: User[];
    totalCustomers: number;
}