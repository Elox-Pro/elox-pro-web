import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../../app/hooks/app.hooks";

export default function DefaultToast() {
  const theme = useAppSelector(state => state.common.theme)
  return (
    <ToastContainer draggable theme={theme.value} position="bottom-left" />
  )
}
