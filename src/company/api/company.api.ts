import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { FindCompaniesResponse } from "../responses/find-companies.response";
import { FindCompaniesRequest } from "../requests/find-companies.request";
import { CreateCompanyResponse } from "../responses/create-company.response";
import { CreateCompanyRequest } from "../requests/create-company.request";
import { EditCompanyNameResponse } from "../responses/edit-company-name.response";
import { EditCompanyNameRequest } from "../requests/edit-company-name.request";
import { AddUserToCompanyResponse } from "../responses/add-user-to-company.response";
import { AddUserToCompanyRequest } from "../requests/add-user-to-company.request";
import { FindManyUsersRequest } from "../requests/find-many-users.request";
import { FindManyUsersResponse } from "../responses/find-many-users.response";
import { FindCompanyResponse } from "../responses/find-company.response";
import { FindCompanyRequest } from "../requests/find-company.request";
import { RemoveUserFromCompanyResponse } from "../responses/remove-user-from-company.response";
import { RemoveUserFromCompanyRequest } from "../requests/remove-user-from-company.request";
import { DeleteCompanyRequest } from "../requests/delete-company.request";

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
    tagTypes: ["findCompanies", "findCompany", "findManyUsers"],
    endpoints(builder) {
        return {
            findCompanies: builder.query<FindCompaniesResponse, FindCompaniesRequest>({
                query(data) {
                    return {
                        url: "/",
                        method: "POST",
                        body: data,
                    }
                },
                providesTags: ["findCompanies"]
            }),
            findCompany: builder.query<FindCompanyResponse, FindCompanyRequest>({
                query(data) {
                    return {
                        method: "GET",
                        url: `/find/${data.id}`,
                    }
                },
                providesTags: ["findCompany"]
            }),
            createCompany: builder.mutation<CreateCompanyResponse, CreateCompanyRequest>({
                query(data) {
                    return {
                        url: `/create`,
                        method: "POST",
                        body: data,
                    }
                },
                invalidatesTags: ["findCompanies"]
            }),
            editCompanyName: builder.mutation<EditCompanyNameResponse, EditCompanyNameRequest>({
                query(data) {
                    return {
                        url: `/update/name`,
                        method: "PATCH",
                        body: data,
                    }
                },
                invalidatesTags: ["findCompanies", "findCompany"]
            }),
            addUserToCompany: builder.mutation<AddUserToCompanyResponse, AddUserToCompanyRequest>({
                query(data) {
                    return {
                        url: `/add/user`,
                        method: "PATCH",
                        body: data,
                    }
                },
                invalidatesTags: ["findCompany", "findManyUsers"]
            }),
            removeUserFromCompany: builder.mutation<RemoveUserFromCompanyResponse, RemoveUserFromCompanyRequest>({
                query(data) {
                    return {
                        url: `/remove/user`,
                        method: "DELETE",
                        body: data,
                    }
                },
                invalidatesTags: ["findCompany", "findManyUsers"]
            }),
            deleteCompany: builder.mutation<void, DeleteCompanyRequest>({
                query(data) {
                    return {
                        url: `/delete/company`,
                        method: "DELETE",
                        body: data,
                    }
                },
                invalidatesTags: ["findCompanies"]
            }),
            findManyUsers: builder.query<FindManyUsersResponse, FindManyUsersRequest>({
                query(data) {
                    return {
                        url: '/find-many/users',
                        method: "POST",
                        body: data,
                    }
                },
                providesTags: ["findManyUsers"]
            }),
        }
    },
});

export const {
    useFindCompaniesQuery,
    useFindCompanyQuery,
    useCreateCompanyMutation,
    useEditCompanyNameMutation,
    useAddUserToCompanyMutation,
    useRemoveUserFromCompanyMutation,
    useDeleteCompanyMutation,
    useFindManyUsersQuery,
} = companyApi;