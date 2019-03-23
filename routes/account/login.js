var express = require('express');
var router = express.Router();
var loginUser = require('../../controller/account/login');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');

router.post(`${API}login`, function (req, res, next) {

    req.checkBody('email', 'Email Incorrect').isEmail();
    req.checkBody('password', 'Password Missing').notEmpty();
    req.checkBody('password', 'Password is Short').len(6);

    var errors = req.validationErrors();

    if (errors) {
        res.json(errors);
    } else {
        let queryParameters = req.body;
        let userEmail = queryParameters.email;
        let userPassword = queryParameters.password;

        loginUser(userEmail, userPassword)
            .then((userData) => {
                let userToken = createUserToken(userData.email, userData.user_id);
                let userInfo = {
                    user_id: userData.user_id,
                    first_name: userData.first_name,
                    email: userData.user_email,
                    phone_no: userData.phone_no,
                    tc_box: userData.tc_box,
                    user_type: userData.user_type,
                    token: userToken
                }
                res.json(responseApi.response(responseCode.OK, userInfo));
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    }
});


let createUserToken = (email, id) => {

    return jwt.sign({
            email: email,
            id: id
        },
        process.env.SECRET_KEY, {
            expiresIn: '21h'
        });

}

module.exports = router;
