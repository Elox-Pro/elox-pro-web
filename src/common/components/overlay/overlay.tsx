import { useAppSelector } from "../../../app/hooks/app.hooks"
import "./overlay.scss"
export function Overlay() {
    const { overlay } = useAppSelector(state => state.common);
    const active = overlay.active ? "active" : "";
    return (
        <div className={`overlay ${active}`}>
            <div className="loading-container">
                <div className={`loading-bar`}></div>
            </div>
        </div >
    )
}