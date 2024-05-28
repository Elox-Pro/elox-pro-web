import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

type IconButtonProps = {
    text: string;
    icon: string;
    onClick: () => void;
};

export default function IconButton({ text, icon, onClick }: IconButtonProps) {
    return (
        <div className="d-inline-flex flex-column align-items-center mx-1">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{text}</Tooltip>}>
                <Button type="button" variant="outline-primary" onClick={onClick}>
                    <i className={icon}></i>
                </Button>
            </OverlayTrigger>
        </div>
    );
}