import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { CompaniesResponse } from "../types/find-many-companies/companies-response.type";
import { CompaniesRequest } from "../types/find-many-companies/companies-request.type";
import { CompanyResponse } from "../types/find-company-by-id/company-response.type";
import { CompanyRequest } from "../types/find-company-by-id/company-request.type";
import { CreateCompanyResponse } from "../types/create-company/create-company-response.type";
import { CreateCompanyRequest } from "../types/create-company/create-company-request.type";

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
    tagTypes: ["getCompanies"],
    endpoints(builder) {
        return {
            getCompanies: builder.query<CompaniesResponse, CompaniesRequest>({
                query(data) {
                    return {
                        url: `/?page=${data.page}&limit=${data.limit}&searchTerm=${data.searchTerm || ""}`,
                        method: "GET",
                    }
                },
                providesTags: ["getCompanies"]
            }),
            getCompany: builder.query<CompanyResponse, CompanyRequest>({
                query(data) {
                    return {
                        url: `/find/${data.id}`,
                        method: "GET",
                    }
                }
            }),
            createCompany: builder.mutation<CreateCompanyResponse, CreateCompanyRequest>({
                query(data) {
                    return {
                        url: `/create`,
                        method: "POST",
                        body: data,
                    }
                },
                invalidatesTags: ["getCompanies"]
            }),
        }
    },
});

export const {
    useGetCompaniesQuery,
    useGetCompanyQuery,
    useCreateCompanyMutation,
} = companyApi;