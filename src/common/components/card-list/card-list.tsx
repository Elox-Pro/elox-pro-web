import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { IconType } from "../../enums/icon-type.enum";

type CardListProps = {
    children: React.ReactNode;
    icon?: IconType;
    title?: string;
};
export default function CardList({ icon, title, children }: CardListProps) {
    return (
        <Card>
            <Card.Body>
                {
                    icon && title &&
                    <Card.Title>
                        <i className={icon}></i>
                        <span className="ms-3">{title}</span>
                    </Card.Title>
                }
                <ListGroup variant="flush">
                    {children}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}