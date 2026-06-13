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
    USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',
    ADDRESS_ALREADY_EXISTS: 'ADDRESS_ALREADY_EXISTS',
    ProductIdRequired: 'ProductIdRequired',
    ReviewAlreadyExists: 'ReviewAlreadyExists',
    InvalidRating: 'InvalidRating',
    OrderNotFound: 'OrderNotFound',
    OrderIdAndStatusRequired: 'OrderIdAndStatusRequired',
    OrderStatusInvalidForUpdate: 'OrderStatusInvalidForUpdate',
    OrderStatusInvalidForCancel: 'OrderStatusInvalidForCancel',
    OrderStatusInvalidForReturn: 'OrderStatusInvalidForReturn',
    OrderIdRequired: 'OrderIdRequired',
    UserIdRequired: 'UserIdRequired',
    UserIdAndProductIdRequired: 'UserIdAndProductIdRequired',
    ProductNotFound: 'ProductNotFound',
    InvalidQuantity: 'InvalidQuantity',
    CartIdOrUserIdRequired: 'CartIdOrUserIdRequired',
    CartNotFound: 'CartNotFound',
    CartItemIdentifierRequired: 'CartItemIdentifierRequired',
    CartItemNotFound: 'CartItemNotFound',
    UserIdAndItemsRequired: 'UserIdAndItemsRequired',
    MissingIdempotencyKey: 'MissingIdempotencyKey',
    CheckoutAlreadyExists: 'CheckoutAlreadyExists',
    InvalidShippingOrBillingAddress: 'InvalidShippingOrBillingAddress',
    UserNotFound: 'UserNotFound',
    InvalidCouponCode: 'InvalidCouponCode',
    CheckoutSessionNotFoundError: 'CheckoutSessionNotFoundError',
    InvalidPayload: 'InvalidPayload',
    AddressNotFound: 'AddressNotFound',
    DeliveryMethodNotFound: 'DeliveryMethodNotFound',
    PaymentMethodRequired: 'PaymentMethodRequired'
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
    },
    AddressAlreadyExistsErrorType: {
        name: 'AddressAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.ADDRESS_ALREADY_EXISTS,
        errorCode: 1011
    },
    ProductIdRequiredErrorType: {
        name: 'ProductIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.ProductIdRequired,
        errorCode: 1012
    },
    ReviewAlreadyExistsErrorType: {
        name: 'ReviewAlreadyExistsErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.ReviewAlreadyExists,
        errorCode: 1013
    },
    InvalidRatingErrorType: {
        name: 'InvalidRatingErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.InvalidRating,
        errorCode: 1014
    },
    OrderIdRequiredErrorType: {
        name: 'OrderIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderIdRequired,
        errorCode: 1015
    },
    OrderNotFound: {
        name: 'OrderNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderNotFound,
        errorCode: 1016
    },
    OrderIdAndStatusRequiredErrorType: {
        name: 'OrderIdAndStatusRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderIdAndStatusRequired,
        errorCode: 1017
    },
    OrderStatusInvalidForUpdateErrorType: {
        name: 'OrderStatusInvalidForUpdateErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderStatusInvalidForUpdate,
        errorCode: 1018
    },
    OrderStatusInvalidForCancelErrorType: {
        name: 'OrderStatusInvalidForCancelErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderStatusInvalidForCancel,
        errorCode: 1019
    },
    OrderStatusInvalidForReturnErrorType: {
        name: 'OrderStatusInvalidForReturnErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderStatusInvalidForReturn,
        errorCode: 1020
    },
    OrderIdRequiredErrorType: {
        name: 'OrderIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.OrderIdRequired,
        errorCode: 1021
    },
    UserIdRequiredErrorType: {
        name: 'UserIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.UserIdRequired,
        errorCode: 1022
    },
    UserIdAndProductIdRequiredErrorType: {
        name: 'UserIdAndProductIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.UserIdAndProductIdRequired,
        errorCode: 1023
    },
    ProductNotFoundErrorType: {
        name: 'ProductNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.ProductNotFound,
        errorCode: 1024
    },
    InvalidQuantityErrorType: {
        name: 'InvalidQuantityErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.InvalidQuantity,
        errorCode: 1025
    },
    CartNotFoundErrorType: {
        name: 'CartNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.CartNotFound,
        errorCode: 1026
    },
    CartIdOrUserIdRequiredErrorType: {
        name: 'CartIdOrUserIdRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.CartIdOrUserIdRequired,
        errorCode: 1027
    },
    CartItemIdentifierRequiredErrorType: {
        name: 'CartItemIdentifierRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.CartItemIdentifierRequired,
        errorCode: 1028
    },
    CartItemNotFoundErrorType: {
        name: 'CartItemNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.CartItemNotFound,
        errorCode: 1029
    },
    UserIdAndItemsRequiredErrorType: {
        name: 'UserIdAndItemsRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.UserIdAndItemsRequired,
        errorCode: 1030
    },
    MissingIdempotencyKeyErrorType: {
        name: 'MissingIdempotencyKeyErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.MissingIdempotencyKey,
        errorCode: 1031
    },
    InvalidShippingOrBillingAddressErrorType: {
        name: 'InvalidShippingOrBillingAddressErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.InvalidShippingOrBillingAddress,
        errorCode: 1032
    },
    UserNotFoundErrorType: {
        name: 'UserNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.UserNotFound,
        errorCode: 1033
    },
    InvalidCouponCodeErrorType: {
        name: 'InvalidCouponCodeErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.InvalidCouponCode,
        errorCode: 1034
    },
    CheckoutSessionNotFoundErrorType: {
        name: 'CheckoutSessionNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.CheckoutSessionNotFoundError,
        errorCode: 1035
    },
    InvalidPayloadErrorType: {
        name: 'InvalidPayloadErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.InvalidPayload,
        errorCode: 1036
    },
    AddressNotFoundErrorType: {
        name: 'AddressNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.AddressNotFound,
        errorCode: 1037
    },
    DeliveryMethodNotFoundErrorType: {
        name: 'DeliveryMethodNotFoundErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.DeliveryMethodNotFound,
        errorCode: 1038
    },
    PaymentMethodRequiredErrorType: {
        name: 'PaymentMethodRequiredErrorType',
        statusCode: StatusCodes.BAD_REQUEST,
        isOperational: true,
        description: messages.PaymentMethodRequired,
        errorCode: 1039
    }
}