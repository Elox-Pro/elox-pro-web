import { HttpStatus } from "../../common/constants/common.constants";
import { ErrorState } from "../types/error-state.type";

/**
 * Parses an error response object and creates an ErrorState object.
 *
 * @param {any} errorResponse - The error response object received from the server or other sources.
 * @returns {ErrorState} An ErrorState object containing the error message and status code.
 */
export function parseErrorResponse(errorResponse: any): ErrorState {
    // Check if the error response object has a valid data property with message and statusCode
    if (errorResponse?.data?.message && errorResponse.data.statusCode) {
        return {
            message: errorResponse.data.message,
            code: errorResponse.data.statusCode
        } as ErrorState;
    }

    // If the error response object doesn't have a valid data property, return a default error state
    return {
        message: "Something went wrong",
        code: HttpStatus.INTERNAL_SERVER_ERROR
    } as ErrorState;
}
