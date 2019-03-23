let httpCodes = {


    /**
        * Success
        */
    OK: 200,
    CREATED: 201,
    NO_DATA: 204,
    /**
     * Redirection Error
     */
    PARAMS_MISSING: 300,
    INVALID_PARAMS: 301,
    /**
     * Client Error
     */
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    /**
     * Server Error
     */
    INTERVAL_SERVER_ERROR: 500,
    INTERVAL_QUEUE_ERROR: 502,
    SERVICE_UNAVAILABLE: 503,
    DB_ERROR: 504,
    DB_CONNECTION_ERROR: 505,

}

module.exports = httpCodes;