var userModel = require('../../model/account/user');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const bcrypt = require('bcrypt');

function loginRequest(email, password) {

    let userEmail = email;
    let userPassword = password;
    return new Promise((resolve, reject) => {
        userModel.findOne({
                where: {
                    email: userEmail,
                    is_verified: 1
                },
                raw: true
            })
            .then((user) => {
                if (user == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "User not found against this email"))
                } else {
                    bcrypt.compare(userPassword, user.password).then(function (res, err) {
                        if (res) {
                            resolve(user);
                        } else {
                            reject(responseApi.response(responseCode.FORBIDDEN, responseMessage.PASSWORD_INVALID));
                        }
                    });
                }
            })
            .catch((failure) => {
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

module.exports = loginRequest;