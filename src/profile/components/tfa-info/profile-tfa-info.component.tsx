import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import Badge from "react-bootstrap/esm/Badge"
import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum"

type ProfileTfaInfoProps = {
    user: User
}
export default function ProfileTfaInfo({ user }: ProfileTfaInfoProps) {

    const tfaEmailElement: JSX.Element = (
        <>
            <span>Enable email verification for 2FA in your account</span>
            {user.tfaType === TfaType.EMAIL &&
                <Badge className="ms-3" bg="success">Configured</Badge>
            }
        </>
    );

    const handleEnableTfa = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-shield-check me-3"></i>
                    Two-factor authentication
                </Card.Title>
                <p>
                    2FA helps your account security by adding an extra login step.
                </p>
                <ListGroup variant="flush">
                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Email"
                        value={tfaEmailElement}
                        onClick={handleEnableTfa}
                    />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}