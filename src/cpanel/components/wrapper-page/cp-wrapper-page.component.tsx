import { PropsWithChildren } from "react";
import "./cp-wrapper-page.styles.scss"

type WrapperPageProps = {
    show: boolean;
} & PropsWithChildren
export default function CPWrapperPage({ show, children }: WrapperPageProps) {
    return (
        show && <div className="cp-wrapper-page">
            {children}
        </div>
    )
}