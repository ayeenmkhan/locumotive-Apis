var express = require('express');
var router = express.Router();
var loginUser = require('../../controller/account/login');
var register = require('../../controller/account/register');
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
        res.json(responseApi.error(responseCode.INVALID_PARAMS, "Invalid/Missing Input Paramenters"));
    } else {
        let queryParameters = req.body;
        let userEmail = queryParameters.email;
        let userPassword = queryParameters.password;

        loginUser(userEmail, userPassword)
            .then((userData) => {
                let userToken = createUserToken(userData.email, userData.user_id);
            //   console.log(userData);
                let userInfo = {
                    user_id: userData.user_id,
                    store_id:userData.store_id,
                    first_name: userData.first_name,
                    email: userData.user_email,
                    phone_no: userData.phone_no,
                    tc_box: userData.tc_box,
                    user_type: userData.user_type,
                    profile_photo:userData['locom_profile.profile_photo'],
                    token: userToken,
                    fcm_token: userData.fcm_token
                    
                }
                // console.log(userInfo);
                let response={
                    "status":responseCode.OK,
                    "data":userInfo,
                }
                res.json(response);
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

router.put(`${API}fcm-token`, function (req, res, next) {
    req.checkBody('user_id', 'Password Missing').notEmpty();
    req.checkBody('token', 'Token is Missing').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.json(responseApi.error(responseCode.INVALID_PARAMS, "Invalid/Missing Input Paramenters"));
    } else {
        let queryParameters = req.body;
        let userId = queryParameters.user_id;
        let token = queryParameters.token;

        register.updateFcmToken(userId, token)
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    }
});
module.exports = router;
