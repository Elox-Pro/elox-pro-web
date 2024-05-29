import { ReactNode } from "react"
import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"

type ContainerProps = {
    children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
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

type IconTitleProps = {
    value: string,
    iconClass?: string
}

const IconTitle = ({ value, iconClass = "bi bi-info-square" }: IconTitleProps) => {
    return (
        <Card.Title>
            <i className={`${iconClass} me-3`}></i>
            {value}
        </Card.Title>
    )
}

const CardListGroup = {
    Container,
    IconTitle
}

export default CardListGroup;