import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Checks if the provided error is a FetchBaseQueryError.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a FetchBaseQueryError.
 */
const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "data" in error
    );
};

/**
 * Checks if the provided error is a SerializedError.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a SerializedError.
 */
const isSerializedError = (error: unknown): error is SerializedError => {
    return (
        typeof error === "object" &&
        error !== null &&
        (
            "message" in error ||
            "name" in error ||
            "code" in error ||
            "stack" in error
        )
    );
};

/**
 * Enum representing different types of errors.
 */
export enum ErrorType {
    FetchBaseQueryError = "FetchBaseQueryError",
    SerializedError = "SerializedError",
    Unknown = "Unknown",
}

/**
 * Data structure representing error details.
 */
export type ErrorData = {
    error?: string;
    message?: string;
    statusCode?: number;
    stack?: string;
};

/**
 * Response structure representing an error.
 */
export type ErrorResponse = {
    type: ErrorType;
    data: ErrorData;
};

/**
 * Handles errors by categorizing and structuring them into a standardized ErrorResponse format.
 * @param error The error to handle.
 * @returns An ErrorResponse object containing categorized error data.
 */
export const useHandleError = (error: unknown): ErrorResponse => {
    if (isFetchBaseQueryError(error)) {
        return {
            type: ErrorType.FetchBaseQueryError,
            data: error.data as ErrorData,
        };
    }
    if (isSerializedError(error)) {
        return {
            type: ErrorType.SerializedError,
            data: {
                error: error.name,
                message: error.message,
                statusCode: error.code,
                stack: error.stack,
            },
        };
    }
    return {
        type: ErrorType.Unknown,
        data: {
            error: ErrorType.Unknown,
        },
    };
}