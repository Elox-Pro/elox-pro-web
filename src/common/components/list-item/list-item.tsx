import { ReactNode } from "react";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import { IconType } from "../../enums/icon-type.enum";

type ListItemProps = {
    children: ReactNode;
    disabled?: boolean;
    variant?: 'danger' | 'warning' | 'success' | 'info' | 'default';
    onClick?: () => void;
};

const ListItem = ({ children, disabled = false, variant = "default", onClick }: ListItemProps): JSX.Element => {
    return (
        <ListGroup.Item
            className={`py-3 px-2 ${disabled ? 'disabled opacity-75' : ''}`}
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            action>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </ListGroup.Item>
    );
};

type BodyProps = {
    children: ReactNode;
    icon?: IconType;
    src?: string;
    alt?: string;
};

ListItem.Body = ({ children, icon, src, alt }: BodyProps): JSX.Element => {
    return (
        <>
            <Col xs={9}>
                <Row className="w-100 align-items-center g-0">
                    {children}
                </Row>
            </Col>
            {
                icon && !src &&
                <Col xs={3} className="fs-4 text-end">
                    <i className={icon}></i>
                </Col>
            }
            {
                !icon && src &&
                <Col xs={3}>
                    <img width={24} src={src} alt={alt || "Item image"} />
                </Col>
            }
        </>
    );
};

type LabelProps = {
    label: string;
    value?: string;
    description?: string;
    src?: string;
    alt?: string;
};

ListItem.Label = ({ label, value, description, src, alt }: LabelProps) => {
    return (
        <>
            <Col xs={12} md={3}>
                <p className="mb-0 text-muted">
                    {label}
                </p>
            </Col>
            <Col xs={12} md={9}>
                {src &&
                    <img width={24} src={src} alt={alt || value} className="d-inline-flex me-2" />
                }
                <p className="mb-0 me-3 d-inline-flex">
                    <span>{value}</span>
                    {
                        description &&
                        <small className="text-muted"><br />{description}</small>
                    }
                </p>
            </Col>
        </>
    )
}

type IconProps = {
    icon: IconType;
    value: string;
    description?: string;
}

ListItem.Icon = ({ icon, value, description }: IconProps) => {
    return (
        <>
            <Col xs={3}>
                <i className={`fs-4 ${icon}`}></i>
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    <span>{value}</span>
                    {
                        description &&
                        <small className="text-muted"><br />{description}</small>
                    }
                </p>
            </Col>
        </>
    )
}

type ImageProps = {
    src: string;
    alt: string;
    value: string;
    description?: string;
}

ListItem.Image = ({ src, alt, value, description }: ImageProps) => {
    return (
        <>
            <Col xs={3}>
                <img width={24} src={src} alt={alt} />
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    <span>{value}</span>
                    {
                        description &&
                        <small className="text-muted"><br />{description}</small>
                    }
                </p>
            </Col>
        </>
    )
}

export default ListItem;