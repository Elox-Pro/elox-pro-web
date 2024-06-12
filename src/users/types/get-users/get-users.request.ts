import { PaginationRequest } from "../../../common/types/pagination-request.type";

export type GetUsersRequest = {
    skipUsersFromCompanyId?: number;
} & PaginationRequest;