import Col from "react-bootstrap/esm/Col";

/**
 * Props for ListGroupItemValue component
 */
type ListGroupItemValueProps = {
    value: string | JSX.Element
};

/**
 * Component for rendering value in ListGroupItem
 * @param {ListGroupItemValueProps} props - Props for ListGroupItemValue component
 * @returns {JSX.Element} - Rendered JSX element
 */
export default function ListGroupItemValue({ value }: ListGroupItemValueProps) {
    return (
        <Col xs={12} md={8}>
            <p className="mb-0">{value}</p>
        </Col>
    );
}