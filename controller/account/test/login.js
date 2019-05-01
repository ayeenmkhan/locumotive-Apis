var userModel = require('../../model/account/user');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const bcrypt = require('bcrypt');
var profileDetail = require('../../model/account/locom-profile');
var storeProfile = require('../../model/account/store-profile');
function loginRequest(email, password) {

    let userEmail = email;
    let userPassword = password;
    return new Promise((resolve, reject) => {
        userModel.findOne({
                where: {
                    email: userEmail,
                    is_verified: 1
                },
                include: [{
                    model: profileDetail,
                }],
                raw: true
            })
            .then((user) => {
                if (user == null || user == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "User not found against this email"))
                } else {
                    bcrypt.compare(userPassword, user.password).then(function (res, err) {
                        if (res) {
                            if(user.user_type==0){
                            storeProfile.findOne({
                                where: {
                                    user_id: user.user_id,
                                },
                            })
                            .then((logging)=>{
                                //  console.log("loging result is",logging);
                                user.store_id=logging.id;
                                console.log("USER DATA IS ",user)
                                resolve(user);
                            })
                            .catch((err)=>{
                                console.log(err);
                             reject(responseApi.error(responseCode.FORBIDDEN, responseMessage.PASSWORD_INVALID));
                            })
                        }else{
                            resolve(user);
                        }
                            
                        } else {
                            reject(responseApi.error(responseCode.FORBIDDEN, responseMessage.PASSWORD_INVALID));
                        }
                    });
                }
            })
            .catch((failure) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

module.exports = loginRequest;