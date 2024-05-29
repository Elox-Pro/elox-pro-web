import { ReactNode } from "react"
import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"

type CardListGroupProps = {
    children: ReactNode
}
export default function CardListGroup({ children }: CardListGroupProps) {
    return (
        <Card>
            <Card.Body>
                <ListGroup variant="flush">
                    {children}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}