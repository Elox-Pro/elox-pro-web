import Toast from "react-bootstrap/esm/Toast";
import DefaultToast from "../../../common/components/default-toast/default-toast.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setProfileToast } from "../../features/profile.slice";

export default function ProfileToast() {

    const { toast } = useAppSelector(state => state.profile)
    const { title, message, show } = toast
    const dispatch = useAppDispatch()

    const handleOnCloseAction = () => {
        dispatch(setProfileToast({ show: false, title: "", message: "" }))
    }

    return (
        <DefaultToast show={show} onCloseAction={handleOnCloseAction}>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>
                {message}
            </Toast.Body>
        </DefaultToast>
    )
}
