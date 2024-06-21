import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { CompanyListResponse } from "../responses/company-list.response";
import { CompanyListRequest } from "../requests/company-list.request";
import { CompanyResponse } from "../types/find-company-by-id/company-response.type";
import { CompanyRequest } from "../types/find-company-by-id/company-request.type";
import { CreateCompanyResponse } from "../responses/create-company.response";
import { CreateCompanyRequest } from "../requests/create-company.request";
import { EditCompanyNameResponse } from "../responses/edit-company-name.response";
import { EditCompanyNameRequest } from "../requests/edit-company-name.request";
import { AddUserToCompanyResponse } from "../types/add-user-to-company/add-user-to-company-response.type";
import { AddUserToCompanyRequest } from "../types/add-user-to-company/add-user-to-company-request.type";
import { RemoveUserFromCompanyResponse } from "../types/remove-user-from-company/remove-user-from-company-response.type";
import { RemoveUserFromCompanyRequest } from "../types/remove-user-from-company/remove-user-from-company-request.type";

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
    tagTypes: ["getCompanies", "getCompany"],
    endpoints(builder) {
        return {
            getCompanies: builder.query<CompanyListResponse, CompanyListRequest>({
                query(data) {
                    return {
                        url: "/",
                        method: "POST",
                        body: data,
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
                },
                providesTags: ["getCompany"]
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
            updateCompanyName: builder.mutation<EditCompanyNameResponse, EditCompanyNameRequest>({
                query(data) {
                    return {
                        url: `/update/name`,
                        method: "PATCH",
                        body: data,
                    }
                },
                invalidatesTags: ["getCompanies", "getCompany"]
            }),
            addUserToCompany: builder.mutation<AddUserToCompanyResponse, AddUserToCompanyRequest>({
                query(data) {
                    return {
                        url: `/add/user`,
                        method: "PATCH",
                        body: data,
                    }
                },
                invalidatesTags: ["getCompany"]
            }),
            removeUserFromCompany: builder.mutation<RemoveUserFromCompanyResponse, RemoveUserFromCompanyRequest>({
                query(data) {
                    return {
                        url: `/remove/user`,
                        method: "DELETE",
                        body: data,
                    }
                },
                invalidatesTags: ["getCompany"]
            }),
            deleteCompany: builder.mutation<void, CompanyRequest>({
                query(data) {
                    return {
                        url: `/delete/company`,
                        method: "DELETE",
                        body: data,
                    }
                },
                invalidatesTags: ["getCompanies"]
            })
        }
    },
});

export const {
    useGetCompaniesQuery,
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyNameMutation,
    useAddUserToCompanyMutation,
    useRemoveUserFromCompanyMutation,
    useDeleteCompanyMutation
} = companyApi;