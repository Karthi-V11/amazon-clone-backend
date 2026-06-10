import { StatusCodes } from 'http-status-codes'

export const messages = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    USER_EXISTS: 'USER_EXISTS',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    USER_DOES_NOT_EXISTS: 'USER_DOES_NOT_EXISTS',
    ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED: 'ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED',
    PHONE_ALREADY_EXISTS: 'PHONE_ALREADY_EXISTS',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS'
}

export const errorTypes = {
    InternalServerErrorType: {
        name: 'InternalServerError',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        isOperational: true,
        description: messages.INTERNAL_SERVER_ERROR,
        errorCode: 1001
    },
    ValidationErrorType: {
        name: 'ValidationError',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.VALIDATION_ERROR,
        errorCode: 1002
    },
    UnauthorizedErrorType: {
        name: 'UnauthorizedError',
        statusCode: StatusCodes.UNAUTHORIZED,
        isOperational: true,
        description: messages.INVALID_CREDENTIALS,
        errorCode: 1003
    },
    NotFoundErrorType: {
        name: 'NotFoundError',
        statusCode: StatusCodes.NOT_FOUND,
        isOperational: true,
        description: messages.NOT_FOUND,
        errorCode: 1004
    },
    AuthenticationErrorType: {
        name: 'AuthenticationErrorType',
        statusCode: StatusCodes.UNAUTHORIZED,
        isOperational: true,
        description: messages.ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED,
        errorCode: 1005
    },
    UserDoesNotExistsErrorType: {
        name: 'UserDoesNotExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.USER_DOES_NOT_EXISTS,
        errorCode: 1006
    },
    UserAlreadyExistsErrorType: {
        name: 'UserAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.USER_EXISTS,
        errorCode: 1007
    },
    EmailAlreadyExistsErrorType: {
        name: 'EmailAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.EMAIL_ALREADY_EXISTS,
        errorCode: 1008
    },
    UserNameAlreadyExistsErrorType: {
        name: 'UserNameAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.USERNAME_ALREADY_EXISTS,
        errorCode: 1009
    },
    PhoneAlreadyExistsErrorType: {
        name: 'PhoneAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.PHONE_ALREADY_EXISTS,
        errorCode: 1010
    }
}