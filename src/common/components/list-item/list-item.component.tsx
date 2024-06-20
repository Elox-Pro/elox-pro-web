import { ReactNode } from "react";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

type ContentProps = {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
};

const Content = ({ children, disabled = false, onClick }: ContentProps): JSX.Element => {
    return (
        <ListGroup.Item
            className={`py-3 px-1 ${disabled ? 'disabled opacity-75' : ''}`}
            onClick={onClick}
            disabled={disabled}
            action>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </ListGroup.Item>
    );
};

type BodyContentProps = {
    children: ReactNode;
};

const BodyContent = ({ children }: BodyContentProps): JSX.Element => {
    return (
        <Col xs={10}>
            <Row className="w-100 align-items-center g-0">
                {children}
            </Row>
        </Col>
    );
};

type BodyIconProps = {
    icon: string;
};

const BodyIcon = ({ icon }: BodyIconProps): JSX.Element => {
    return (
        <Col xs={2} className="fs-4 text-end">
            <i className={icon}></i>
        </Col>
    );
};

type BodyImageProps = {
    src: string;
    alt: string;
};

const BodyImage = ({ src, alt }: BodyImageProps): JSX.Element => {
    return (
        <Col xs={3}>
            <img width={24} src={src} alt={alt} />
        </Col>
    );
};

type LabelProps = {
    value: string;
};

const Label = ({ value }: LabelProps) => {
    return (
        <Col xs={12} md={3}>
            <p className="mb-0 text-muted">
                {value}
            </p>
        </Col>
    );
}

type ValueProps = {
    value: string;
};

const Value = ({ value }: ValueProps) => {
    return (
        <Col xs={12} md={9}>
            <p className="mb-0 me-3">
                {value}
            </p>
        </Col>
    )
}


type SectionProps = {
    children: ReactNode;
};

const Section = ({ children }: SectionProps) => {
    return (
        <Col xs={12} md={9}>
            {children}
        </Col>
    );
}

type ImageProps = {
    src: string;
    alt: string;
    title: string;
    description?: string | null;
};

const Image = ({ src, alt, title, description }: ImageProps) => {
    return (
        <>
            <Col xs={3}>
                <img width={24} src={src} alt={alt} />
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    <span>{title}</span>
                    {
                        description &&
                        <small className="text-muted"><br />{description}</small>
                    }
                </p>
            </Col>
        </>
    );
}

type IconProps = {
    icon: string;
    title: string;
    description?: string | null;
}

const Icon = ({ icon, title, description }: IconProps) => {
    return (
        <>
            <Col xs={3}>
                <i className={`fs-4 ${icon}`}></i>
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    <span>{title}</span>
                    {
                        description &&
                        <small className="text-muted"><br />{description}</small>
                    }
                </p>
            </Col>
        </>
    )
}



const ListItem = {
    Content,
    BodyContent,
    BodyIcon,
    BodyImage,
    Label,
    Section,
    Value,
    Image,
    Icon,
}

export default ListItem;