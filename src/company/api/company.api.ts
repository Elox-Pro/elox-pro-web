import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { CompaniesResponse } from "../types/find-many-companies/companies-response.type";
import { CompaniesRequest } from "../types/find-many-companies/companies-request.type";

export const companyApi = createApi({
    reducerPath: "companyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/companies`,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.append('Accept-Language', `${i18n.language}`);
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            getCompanies: builder.query<CompaniesResponse, CompaniesRequest>({
                query(data) {
                    return {
                        url: `/?page=${data.page}&limit=${data.limit}&searchTerm=${data.searchTerm || ""}`,
                        method: "GET",
                    }
                }
            }),
        }
    },
});

export const { useGetCompaniesQuery } = companyApi;