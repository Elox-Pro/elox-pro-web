import { ReactNode } from "react";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";

type ContentProps = {
    onClick?: () => void;
    children: ReactNode;
};

const Content = ({ children, onClick }: ContentProps): JSX.Element => {
    return (
        <ListGroup.Item className="p-3" action onClick={onClick}>
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
        <Col xs={9}>
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
        <Col xs={3} className="text-end">
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
        <Col xs={12} md={4}>
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
        <Col xs={12} md={8}>
            <p className="mb-0 me-3">
                {value}
            </p>
        </Col>
    )
}

type ImageProps = {
    src: string;
    alt: string;
    value: string;
};

const Image = ({ src, alt, value }: ImageProps) => {
    return (
        <>
            <Col xs={3}>
                <img width={24} src={src} alt={alt} />
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    {value}
                </p>
            </Col>
        </>
    );
}

type IconProps = {
    icon: string;
    value: string;
}

const Icon = ({ icon, value }: IconProps) => {
    return (
        <>
            <Col xs={3}>
                <i className={`fs-4 ${icon}`}></i>
            </Col>
            <Col xs={9}>
                <p className="mb-0 me-3">
                    {value}
                </p>
            </Col>
        </>
    )
}

type SectionProps = {
    children: ReactNode;
};

const Section = ({ children }: SectionProps) => {
    return (
        <Col xs={12}>
            {children}
        </Col>
    );
}


const ListItem = {
    Content,
    BodyContent,
    BodyIcon,
    BodyImage,
    Label,
    Value,
    Image,
    Icon,
    Section,
}

export default ListItem;