import Col from "react-bootstrap/esm/Col";

/**
 * Props for ListGroupItemLabel component
 */
type ListGroupItemLabelProps = {
    value: string;
};

/**
 * Component for rendering label in ListGroupItem
 * @param {ListGroupItemLabelProps} props - Props for ListGroupItemLabel component
 * @returns {JSX.Element} - Rendered JSX element
 */
export default function ListGroupItemLabel({ value }: ListGroupItemLabelProps) {
    return (
        <Col xs={12} md={3}>
            <p className="mb-0 text-muted">{value}</p>
        </Col>
    );
}