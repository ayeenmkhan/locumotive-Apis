let jwt = require("jsonwebtoken");
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var responseApi = require('../../response/api-response');
/**
 * @implements token validation. If token is expired or null.It blocks the request to process furthuer.
 */

let tokenMW = ((req, res, next) => {

    let token = req.headers.token;
    if (token == null) {
        res.json(responseApi.error(responseCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED));
    } else {

        /**
         * check token if it's expired or not
         */

        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                res.json(responseApi.error(responseCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED));
            } else {
                req.user_data = decoded; // adds users info in token to req object  || contains user id, email address and parent company id
                next();
            }
        });
    }
});

module.exports = tokenMW;
