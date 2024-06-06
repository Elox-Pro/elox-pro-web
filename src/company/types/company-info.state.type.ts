import { User } from "../../users/types/user.type";
import { Company } from "./company.type";

export type CompanyInfoState = {
    company: Company | null;
    users: User[];
    totalUsers: number;
    customers: User[];
    totalCustomers: number;
}