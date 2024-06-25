import { PaginationRequest } from "../../common/types/pagination-request.type";

export type FindManyUsersRequest = {
    companyId: number;
} & PaginationRequest;