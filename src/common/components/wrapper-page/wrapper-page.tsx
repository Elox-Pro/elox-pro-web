import { PropsWithChildren } from "react";
import BackToTopButton from "../back-to-top/back-to-top-button.component";

type WrapperPageProps = {
    show: boolean;
    backToTopOnClick?: () => void;
} & PropsWithChildren
export default function WrapperPage({ show, children, backToTopOnClick, }: WrapperPageProps) {
    return (
        show && <div className="wrapper-page wrapper-container">
            {children}
            <BackToTopButton onClick={backToTopOnClick} />
        </div>
    )
}