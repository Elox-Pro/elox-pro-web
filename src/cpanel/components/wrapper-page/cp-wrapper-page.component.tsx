import { PropsWithChildren } from "react";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";

type WrapperPageProps = {
    show: boolean;
    backToTopOnClick?: () => void;
} & PropsWithChildren
export default function CPWrapperPage({ show, children, backToTopOnClick, }: WrapperPageProps) {
    return (
        show && <div className="cp-wrapper-page wrapper-container">
            {children}
            <BackToTopButton onClick={backToTopOnClick} />
        </div>

    )
}