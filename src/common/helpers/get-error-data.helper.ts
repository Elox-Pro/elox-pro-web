import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Checks if the provided error is a FetchBaseQueryError.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a FetchBaseQueryError.
 */
const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return (
        typeof error === "object"
        && error !== null
        && "status" in error
        && "data" in error
    );
};

/**
 * Checks if the provided error is a SerializedError.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a SerializedError.
 */
const isSerializedError = (error: unknown): error is SerializedError => {
    return (
        typeof error === "object"
        && error !== null
        && ("message" in error || "name" in error || "code" in error || "stack" in error)
    );
};

/**
 * Enum representing different types of errors.
 */
export enum ErrorType {
    FetchBaseQueryError = "FetchBaseQueryError",
    SerializedError = "SerializedError",
    InternalClientError = "Internal Client Error",
}

/**
 * Data structure representing error details.
 */
export type ErrorData = {
    type: ErrorType;
    message: string;
    code?: number;
    error?: string;
    stack?: string;
};

/**
 * Handles errors by categorizing and structuring them into a standardized ErrorResponse format.
 * @param error The error to handle.
 * @returns An ErrorData object containing categorized error data.
 */
export const getErrorData = (error: unknown): ErrorData => {
    
    if (isFetchBaseQueryError(error)) {
        const err = error.data as { message: string, statusCode: number };
        return {
            type: ErrorType.FetchBaseQueryError,
            message: err.message,
            code: err.statusCode,
        } as ErrorData;
    }

    if (isSerializedError(error)) {
        return {
            type: ErrorType.SerializedError,
            error: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack,
        } as ErrorData;
    }

    return {
        type: ErrorType.InternalClientError,
        message: ErrorType.InternalClientError,
    } as ErrorData;
}
