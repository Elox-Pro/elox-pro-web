import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"

type ProfilePasswordInfoProps = {
    user: User
}
export default function ProfilePasswordInfo({ user }: ProfilePasswordInfoProps) {
    const handleChangePassword = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-file-lock2 me-3"></i>
                    Password
                </Card.Title>
                <p>A secure password helps protect your account</p>
                <ListGroup variant="flush">
                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Password"
                        value="••••••••"
                        onClick={handleChangePassword}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )
}