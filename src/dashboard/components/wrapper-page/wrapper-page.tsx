import { PropsWithChildren } from "react";
import Loading from "../../../common/components/loading/loading.component";
import AlertError from "../../../common/components/alert-error/alert-error.component";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type WrapperPageProps = {
    loading: boolean
    status: QueryStatus
    error: FetchBaseQueryError | SerializedError | undefined
} & PropsWithChildren
export default function WrapperPage(
    {loading,children,error,status }: WrapperPageProps
) {
    return (
        <div className="wraper-page">
            <AlertError status={status} error={error} />
            {loading && <Loading />}
            {(!error && !loading) && children}
        </div>
    )
}