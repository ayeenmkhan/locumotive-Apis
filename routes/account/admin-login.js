var express = require('express');
var router = express.Router();
var adminUser = require('../../controller/account/admin-login');
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;

router.post(`${API}admin-login`, function (req, res) {
    req.checkBody('username', 'username Missing').notEmpty();
    req.checkBody('password', 'Password Missing').notEmpty();
    req.checkBody('password', 'Password is Short').len(3);
    var errors = req.validationErrors();
    if (errors) {
        // console.log(errors);
        // response.error.code = 100;
        res.json(responseApi.response(100, "Some data is missing are invalid"));
    } else {
        let queryParameters = req.body;
        // console.log(queryParameters);
        let username = queryParameters.username;
        // console.log("<<USERNAME>>",username)
        let password = queryParameters.password;
        adminUser(username, password)
            .then((userData) => {
                // console.log(userData);
                let userToken = createUserToken(userData.email, userData.id);
                let user = {
                    id: userData.id,
                    username: userData.username,
                    // useremail: userData.email,
                    token: userToken
                }
                res.json(responseApi.response(responseCode.OK,user));
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