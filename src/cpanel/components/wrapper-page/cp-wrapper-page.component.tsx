import { PropsWithChildren } from "react";

type WrapperPageProps = {
    show: boolean;
} & PropsWithChildren
export default function CPWrapperPage({ show, children }: WrapperPageProps) {
    return (
        show && <div className="cp-wrapper-page wrapper-container">
            {children}
        </div>
    )
}