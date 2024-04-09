import { PropsWithChildren } from "react";
import Loading from "../../../common/components/loading/loading.component";
import AlertError, { AlertErrorPros } from "../../../common/components/alert-error/alert-error.component";
import "./cp-wrapper-page.styles.scss"

type WrapperPageProps = {
    loading: boolean
    error: AlertErrorPros["error"]
    status: AlertErrorPros["status"]
} & PropsWithChildren
export default function CPWrapperPage(
    { loading, children, error, status }: WrapperPageProps
) {
    return (
        <div className="cp-wrapper-page">
            <AlertError status={status} error={error} />
            {loading && <Loading />}
            {(!error && !loading) && children}
        </div>
    )
}