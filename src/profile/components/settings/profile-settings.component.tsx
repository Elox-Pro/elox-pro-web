import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"

type ProfileSettingsProps = {
    user: User
}
export default function ProfileSettings({ user }: ProfileSettingsProps) {

    const handleChangeLanguage = () => {
        alert("Not implemented")
    }

    const handleChangeTheme = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-gear me-3"></i>
                    General settings
                </Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Language"
                        value={user.lang}
                        onClick={handleChangeLanguage}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label="Theme"
                        value={user.theme}
                        onClick={handleChangeTheme}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )

}