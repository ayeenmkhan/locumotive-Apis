let apiResponseCode = require('../response/response-codes');
let apiResponseMessages = require('../response/response-messages');

function successResponse(code, message) {
    return {
        status: code,
        data: {}
    }
}
function errorResponse(code, message) {
    return {
        status: code,
        message: message
    }
}
module.exports = {
    response: successResponse,
    error: errorResponse,
    code: apiResponseCode,
    message: apiResponseMessages
};