import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"

type ProfileContactInfoProps = {
    user: User
}
export default function ProfileContactInfo({ user }: ProfileContactInfoProps) {
    
    const emailVerifiedElement: JSX.Element = (
        <>
            <span>{user.email}</span>
            {user.emailVerified &&
                <Badge className="ms-3" bg="success">Verified</Badge>
            }
        </>
    );
    const handleChangeEmail = () => { alert("change email") };

    const phoneVerifiedElement: JSX.Element = (
        <>
            <span>{user.phone || "N/A"}</span>
            {user.phoneVerified &&
                <Badge className="ms-3" bg="success">Verified</Badge>
            }
        </>
    );
    const handleChangePhone = () => { alert("change phone") };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                <i className="bi bi-person-badge me-3"></i>
                    Contact info</Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Email"
                        value={emailVerifiedElement}
                        onClick={handleChangeEmail}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Phone"
                        value={phoneVerifiedElement}
                        onClick={handleChangePhone}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )

}