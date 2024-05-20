import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../app/constants/app.constants";
import i18n from "../../app/i18n/i18n";
import { CompaniesResponse } from "../types/find-many-companies/companies-response.type";

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
            getCompanies: builder.query<CompaniesResponse, void>({
                query() { return "/" }
            }),
        }
    },
});

export const { useGetCompaniesQuery } = companyApi;