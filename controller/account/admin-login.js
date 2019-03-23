var userModel = require('../../model/account/admin-login');
var responseApi = require('../../response/api-response');
var responseCodes = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');

function adminLogin(username, password) {

    console.log(">>USERNAME<<<<<<",username);
    console.log(">>password<<<<<<",password);
    // let username = username;
    // let password = password;
    return new Promise((resolve, reject) => {
        userModel.findOne({
                where: {
                    username: username,
                },
                raw: true,
                logging:true

            })
            .then((user) => {
                // console.log("User data is");
                if (user == null) {
                    // response.error.code = 404;
                    // response.error.message = "User not found against this username"
                    reject(responseApi.response(responseCodes.NOT_FOUND,"User not found against this username"))
                } else {
                    bcrypt.compare(password, user.password).then(function (res) {
                        if (res) {
                            resolve(user);
                        } else {
                            // response.error.code = 314;
                            // response.error.message = "Username or password incorrect"
                            // reject(response.error);
                            reject(responseApi.response(314,"User not found against this username"));
                        }
                    });
                }
            })
            .catch((failure) => {
                console.log(failure);
                // response.error.code = 500;
                // response.error.message = "Something went wrong"
                // reject(response.error)
                reject(responseApi.response(responseCodes.DB_ERROR,responseMessage.DB_ERROR))
            });
    });
}

module.exports = adminLogin;