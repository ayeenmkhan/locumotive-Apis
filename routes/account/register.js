var express = require('express');
var router = express.Router();
var userRegister = require('../../controller/account/register');
var userModel = require('../../model/account/user');
var locumModel = require('../../model/account/locom-profile');
var storeModel = require('../../model/account/store-profile');
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
let API = process.env.API_PREFIX;
var jwt = require('jsonwebtoken');
let tokenMiddleware = require('../../middleware/authentication/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post(`${API}register`, function (req, res, next) {
   // console.log(req.body);
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('email', 'Email is Missing').notEmpty();
    req.checkBody('user_type', 'user type is required').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.json(responseApi.error(responseCode.INVALID_PARAMS, "Invalid/Missing Input Paramenters"));
    } else {
        let queryParameters = req.body;
        // generate random code
        let fourDigitCode;
        fourDigitCode = 1000 + Math.floor(Math.random() * 9000);
        var hashPassword = bcrypt.hashSync(queryParameters.password, saltRounds);
        let userObj = {
            first_name: queryParameters.first_name,
            last_name: queryParameters.last_name,
            email: queryParameters.email,
            password: hashPassword,
            phone_no: queryParameters.phone_no,
            tc_box: queryParameters.tc_box,
            user_type: queryParameters.user_type,
            verification_code: fourDigitCode,
        }
        userRegister.RegisterRequest(userObj)
            .then((user) => {
                let userToken = createUserToken(user.email, user.user_id);
                let userResponse = {
                    "user_id": user.user_id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "phone_no": user.phone_no,
                    "tc_box": user.tc_box,
                    "user_type": user.user_type,
                    "token": userToken,
                }
                let response = {
                    "status": responseCode.OK,
                    "data": userResponse
                }
                res.json(response);
            })
            .catch((error) => {
                res.json(error)
            })
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
router.post(`${API}verify-account`, function (req, res, next) {
    let queryParameters = req.body;
    let userData = {
        email: queryParameters.email,
        verification_code: queryParameters.verification_code

    }
    // console.log(userData)
    userRegister.verifyAccount(userData)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        })
});

router.post(`${API}locom-profile`, tokenMiddleware, function (req, res, next) {
    let queryParameters = req.body;
    let userObj = {
        user_id: queryParameters.user_id,
        date_of_birth: queryParameters.date_of_birth,
        address: queryParameters.address,
        goc_number: queryParameters.goc_number,
        opl_number: queryParameters.opl_number,
        insurance_company: queryParameters.insurance_company,
        insurance_no: queryParameters.insurance_no,
        profile_photo: process.env.FILE_ADDRESS + "/" + queryParameters.profile_photo,
        equipment_preferred: queryParameters.equipment_preferred,
        opl_proof: process.env.FILE_ADDRESS + "/" + queryParameters.opl_proof,
        goc_proof: process.env.FILE_ADDRESS + "/" + queryParameters.goc_proof,
        insurance_proof: process.env.FILE_ADDRESS + "/" + queryParameters.insurance_proof,
        year_of_experience: queryParameters.year_of_experience,
        preferred_testing_time: queryParameters.preferred_testing_time,
        latitude: queryParameters.latitude,
        longitude: queryParameters.longitude,
    }
    let userSkills = {
        skills: queryParameters.skills,
    }
    // console.log(userData)
    userRegister.locomProfile(userObj, userSkills)
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        })

});

router.post(`${API}store-profile`, tokenMiddleware, function (req, res, next) {
    let queryParameters = req.body;
    let storeObj = {
        user_id: queryParameters.user_id,
        store_name: queryParameters.store_name,
        address: queryParameters.address,
        weekend_rate: queryParameters.weekend_rate,
        weekday_rate: queryParameters.weekday_rate,
        equipment: queryParameters.equipment,
        parking_available: queryParameters.parking_available,
        pre_test_required: queryParameters.pre_test_required,
        detail: queryParameters.detail,
        latitude: queryParameters.latitude,
        longitude: queryParameters.longitude,
        prefered_testing_time: queryParameters.preferred_testing_time,
        field_test: queryParameters.field_test,
        phoropter: queryParameters.phoropter,
        trail_frame: queryParameters.trail_frame,
        contact_lens: queryParameters.contact_lens,
        profile_picture: process.env.FILE_ADDRESS + "/" + queryParameters.profile_picture,
    }
    // console.log(userData)
    userRegister.storeProfile(storeObj)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        })
});

// Delete Account
router.delete(`${API}account`, tokenMiddleware, function (req, res, next) {
    let user_id = req.body.user_id;
    let accountType = req.body.account_type;
    userModel.destroy({
        where: {
            user_id: user_id
        }
    })
        .then((deleted) => {
            if (accountType == 0) {
                storeModel.destroy({
                    where: {
                        user_id: user_id
                    }
                })
                    .then((user) => {
                        let response = {
                            "status": responseCode.OK,
                            "data": {
                                "message": "Store Account Deleted Successfuly"
                            }
                        }
                        res.json(response);
                    })
                    .catch((erorr) => {
                        res.json(response.erorr(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                    })
            } else {
                locumModel.destroy({
                    where: {
                        user_id: user_id
                    }
                })
                    .then((user) => {
                        let response = {
                            "status": responseCode.OK,
                            "data": {
                                "message": "Locum Account Deleted Successfuly"
                            }
                        }
                        res.json(response);
                    })
                    .catch((erorr) => {
                        res.json(response.erorr(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                    })
            }
        })
        .catch((error) => {
            res.json(response.erorr(responseCode.DB_ERROR, responseMessage.DB_ERROR));
        });
});
module.exports = router;
