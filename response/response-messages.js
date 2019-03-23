

let responseMessages = {

    USER_NOT_FOUND: 'User not found',
    USER_EXISTS: 'User already exists',
    NO_PARENT: 'Account is not linked to any company',
    LOGGED_IN: 'Successfull Login',

    ACCOUNT_REMOVED: 'Account removed successfuly',
    DATA_REMOVED: 'Removed Successfully',
    DATA_UPDATED: 'Data updated successfuly',
    DATA_CREATED: 'Created successfuly',
    DUPLICATION: 'Data already exists',

    PASSWORD_INVALID: 'Password is incorrect',
    OLD_PASSWORD_INVALID: 'Old password is not correct',
    PASSWORD_RESET: 'Password reset successfuly',
    EMAIL_INVALID: 'Email is not registered',

    TOKEN_EMPTY: 'Token is required',
    TOKEN_INVALID: 'Token is invalid or expired',

    EMAIL_ERROR: 'Email not sent.Error occured',
    EMAIL_SENT: 'Email sent.',

    DATA_NOT_FOUND: 'Data not found',

    DB_CONNECTION: 'Error establishing connection with database',
    DB_ERROR: 'Database error occured',

    UNKNOWN: 'Unknown error occured',
    UNAUTHORIZED: 'User not authorized',
    SERVER_ERROR: 'Internal server error'

};

module.exports = responseMessages;