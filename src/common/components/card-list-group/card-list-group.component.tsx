/**
 * A set of components to create a Card with ListGroup in React.
 * @packageDocumentation
 */

import { ReactNode } from "react"
import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"

/**
 * Props for the Container component.
 * @type ContainerProps
 * @property {ReactNode} children - The content to be rendered inside the Card.
 */
type ContainerProps = {
    children: ReactNode,
}

/**
 * A component to wrap other components inside a Card.
 * @function Container
 * @param {ContainerProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the Card.
 */
const Container = ({ children }: ContainerProps) => {
    return (
        <Card>
            <Card.Body>{children}</Card.Body>
        </Card>
    )
}

/**
 * Props for the IconTitle component.
 * @type IconTitleProps
 * @property {string} value - The main text to be displayed.
 * @property {string} [iconClass] - The CSS class for the icon. Default is "bi bi-info-square".
 */
type IconTitleProps = {
    value: string,
    iconClass?: string
}

/**
 * A component to display an icon and a title inside a Card.Title.
 * @function IconTitle
 * @param {IconTitleProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the Card.Title with the icon and text.
 */
const IconTitle = ({ value, iconClass = "bi bi-file-check" }: IconTitleProps) => {
    return (
        <Card.Title>
            <i className={`${iconClass} me-3`}></i>
            {value}
        </Card.Title>
    )
}

/**
 * Props for the Body component.
 * @type BodyProps
 * @property {ReactNode} children - The content to be rendered inside the Card.Body.
 */
type BodyProps = {
    children: ReactNode,
}

/**
 * A component to wrap other components inside a Card.Body with a ListGroup.
 * @function Body
 * @param {BodyProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the Card.Body with the ListGroup.
 */
const Body = ({ children }: BodyProps) => {
    return (
        <ListGroup variant="flush">
            {children}
        </ListGroup>
    )
}

/**
 * An object containing the Container, IconTitle, and Body components.
 * @constant CardListGroup
 * @type {{ Container: typeof Container, IconTitle: typeof IconTitle, Body: typeof Body }}
 */
const CardListGroup = {
    Container,
    IconTitle,
    Body
}

export default CardListGroup;