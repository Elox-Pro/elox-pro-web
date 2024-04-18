import { PropsWithChildren } from "react";
import "./cp-wrapper-page.styles.scss"

type WrapperPageProps = {} & PropsWithChildren
export default function CPWrapperPage({ children }: WrapperPageProps) {
    return (
        <div className="cp-wrapper-page">
            {children}
        </div>
    )
}