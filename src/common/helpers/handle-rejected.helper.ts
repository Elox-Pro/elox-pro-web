import { NavigateFunction } from "react-router-dom";
import { HttpStatus } from "../constants/common.constants";
import { getErrorData } from "./get-error-data.helper";
import { toast } from "react-toastify";

type HandleRejectedProps = {
    error: unknown
    message: string
    navigate?: NavigateFunction
}
export function handleRejected({ error, message, navigate }: HandleRejectedProps): void {
    const errorData = getErrorData(error);
    if (navigate && errorData.code === HttpStatus.UNAUTHORIZED) {
        navigate("/error/401", { replace: true })
        return;
    }
    toast.error(errorData.message);
    console.error(message, errorData);
    return;
}