var seqluize = require('sequelize');
var userModel = require('../../model/account/user');
var skillModel = require('../../model/account/locom-skills');
var locomModel = require('../../model/account/locom-profile');
var storeModel = require('../../model/account/store-profile');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var responseApi = require('../../response/api-response');
var nodemailer = require('../../node_modules/nodemailer');
let Op = seqluize.Op;

function RegisterRequest(userData) {

    return new Promise((resolve, reject) => {
        userModel.findOne({
            where: {
                email: userData.email,
                // is_verified: 1,  
                [Op.or]: [{ is_verified: 0 }, { is_verified: 1 }],
            },

            logging: true
        }).then((user) => {
            //    console.log("user data is",user);
            if (user) {
                if (user.is_verified == 1) {
                    reject(responseApi.error(responseCode.CONFLICT, responseMessage.USER_EXISTS));
                } else {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.SUPPORT_EMAIL, //email address to send from
                            pass: process.env.SUPPORT_PASSWORD //the actual password for that account
                        }
                    });
                    let mailOptions;
                    mailOptions = {
                        from: `"${process.env.SUPPORT_USER_NAME}" <${process.env.SUPPORT_EMAIL}>`,
                        name: process.env.SUPPORT_USER_NAME,
                        to: user.email, // list of receivers
                        subject: 'Account Confirmation',
                        //   text: 'Reset Password!',
                        html: `<div style='text-align:center'><h3>Hi,</h3>
           \n <span>Please use this code to Confirm your registeration </span>
           \n <h1 style='letter-spacing:5px;color:#3399ff'>${user.verification_code}</h1>
           \n <small>Kindly ignore this email if you didnt request for registeration</small></div>`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            reject({
                                code: 600,
                                message: 'Email server is not responding'
                            })
                        }
                    });
                    resolve(user);
                }
            } else {
                // console.log("Else condition")
                userModel.create(userData)
                    .then(data => {
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.SUPPORT_EMAIL, //email address to send from
                                pass: process.env.SUPPORT_PASSWORD //the actual password for that account
                            }
                        });
                        let mailOptions;
                        mailOptions = {
                            from: `"${process.env.SUPPORT_USER_NAME}" <${process.env.SUPPORT_EMAIL}>`,
                            name: process.env.SUPPORT_USER_NAME,
                            to: userData.email, // list of receivers
                            subject: 'Account Confirmation',
                            //   text: 'Reset Password!',
                            html: `<div style='text-align:center'><h3>Hi,</h3>
               \n <span>Please use this code to Confirm your registeration </span>
               \n <h1 style='letter-spacing:5px;color:#3399ff'>${userData.verification_code}</h1>
               \n <small>Kindly ignore this email if you didnt request for registeration</small></div>`
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                reject({
                                    code: 600,
                                    message: 'Email server is not responding'
                                })
                            }
                        });
                        console.log('Data Inserted and sent email' + data);
                        resolve(data);
                    })
                    .catch((err) => {
                        console.log('Error Occured...' + err);
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                    });
            }

        });

    });


}

function verifyAccount(userData) {
    return new Promise((resolve, reject) => {
        userModel.update({
            is_verified: 1
        }, {
                where: {
                    email: userData.email,
                    verification_code: userData.verification_code
                },
                raw: true,
                logging: true
            })
            .then((CodeVarified) => {
                // console.log("Response is",CodeVarified);
                if (CodeVarified == 1) {
                    resolve(responseApi.error(responseCode.OK, "Account Verified"));
                } else {
                    resolve(responseApi.error(responseCode.FORBIDDEN, "Not Verified email id or Verification code not match"));
                }
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}

function locomProfile(userData, userSkils) {
    
    return new Promise((resolve, reject) => {
        locomModel.create(userData, {
            raw: true
        })
            .then((profileData) => {
                skillModel.bulkCreate(userSkils.skills, {
                    raw: true,
                })
                    .then((success) => {
                        profileData.skills = success;
                        let response={
                            "status":responseCode.OK,
                            "data":profileData
                        }
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}

function updateUserProfile(userData, userSkills) {

    return new Promise((resolve, reject) => {
        locomModel.update(userData, {
            where: {
                user_id: userData.user_id,
            },
            raw: true
        })
            .then((profileData) => {
                skillModel.destroy({
                    where: {
                        user_id: userData.user_id
                    }
                })
                    .then((success) => {
                        // console.log(userSkills);
                        skillModel.bulkCreate(userSkills.skills, {
                            raw: true,
                            // logging:true
                        })
                            .then((skills) => {
                                // console.log(skills);
                                resolve("User profile Updated Successfully");
                            })
                            .catch((error) => {
                                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                            })
                    })
                    .catch((error) => {
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    })
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}


function storeProfile(userData) {

    return new Promise((resolve, reject) => {
        storeModel.create(userData, {
            raw: true
        })
            .then(profileData => {
                let response={
                    "status":responseCode.OK,
                    "data":profileData
                }
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}
function updateFcmToken(user_id, token) {
    return new Promise((resolve, reject) => {

        userModel.update({
        fcm_token: token
        }, {
                where: {
                    user_id: user_id,
                },
                raw: true,
                logging: true
            })
            .then((profileData) => {
                storeModel.update({
                    fcm_token: token
                    }, {
                            where: {
                                user_id: user_id,
                            },
                            raw: true,
                            logging: true
                        })
                        .then((res)=>{
                            let response = {
                                "status": responseCode.OK,
                                "data": {
                                    "message": "Fcm token successfully updated"
                                }
                            }
                            resolve(response);
                        })
                        .catch((error)=>{
                            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                        })
            
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })
    })
}

function logoutProfile(userData) {

    return new Promise((resolve, reject) => {
        userModel.update({
            fcm_token:''
        }, {
            where: {
                user_id: userData.user_id,
            },
            raw: true
        })
            .then((profileData) => {
                resolve("Logout Successfuly");
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}
module.exports = {
    RegisterRequest,
    verifyAccount,
    locomProfile,
    storeProfile,
    updateUserProfile,
    updateFcmToken,
    logoutProfile
}
