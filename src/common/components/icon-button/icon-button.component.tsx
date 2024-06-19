import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

type IconButtonProps = {
    tooltip: string;
    icon: string;
    text?: string;
    onClick: () => void;
};

export default function IconButton({ tooltip, icon, text, onClick }: IconButtonProps) {
    return (
        <div className="text-end">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{tooltip}</Tooltip>}>
                <Button type="button" variant="outline-primary" onClick={onClick}>
                    <i className={icon}></i>
                    {text && <span className="ms-2">{text}</span>}
                </Button>
            </OverlayTrigger>
        </div>
    );
}