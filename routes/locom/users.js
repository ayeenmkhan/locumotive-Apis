var express = require('express');
var router = express.Router();
var user = require('../../controller/locom/users');
var userRegister = require('../../controller/account/register');
var jwt = require('jsonwebtoken');
var tokenMiddleware = require('../../middleware/authentication/jwt');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var fileUpload = require('../../controller/locom/file-upload');
var multer = require('multer');
var limits = {
    files: 1, // allow only 1 file per request
    fileSize: process.env.FILE_SIZE * 1024 * 1024 * 8, // 5 MB (max file size)
};
let filePath = process.env.FILE_ADDRESS;
var upload = multer({
    storage: fileUpload,
    limits: limits,
}).single('file');

/**
 * @returns Upload Image/file 
 */
router.post(`${API}file-upload`, function (req, res, next) {

    // console.log("request data is ", req.body)
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            if (req.file.filename === undefined || req.file.filename === 'undefined' || req.file.filename === '') {
                var file = " ";
            } else {
                var file = req.file.filename;
            }
            let response={
                "status":responseCode.OK,
                "data":{
                    "file_name":file
                }
            }
            // console.log("file name is",file);
            res.json(response);
        }
       
    });
});

/**
 * get user profile data
 */
router.get(`${API}user-detail/:id`,tokenMiddleware, function (req, res, next) {

    let user_id = req.params.id;
    // console.log("user id is",user_id);
    try {
        user.userDetail(user_id)
            .then((detail) => {
                let response={
                    "status":responseCode.OK,
                    "data":detail
                }
                res.json(response);
            })
            .catch((err) => {
                // console.log("Error is",err);
                res.json(err);
            });
    } catch (err) {
        console.log(err);
    }
});

/**
 * Get usesr review detail
 */
router.get(`${API}user-review/:id`,tokenMiddleware, function (req, res, next) {

    let user_id = req.params.id;
    // console.log("user id is",user_id);
    try {
        user.userReview(user_id)
            .then((detail) => {
                let response={
                    "status":responseCode.OK,
                    "data":detail
                }
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    } catch (err) {
        console.log(err);
    }
});

/**
 * Add user review detail
 */
router.post(`${API}user-review`,tokenMiddleware, function (req, res, next) {

    let review = req.body;
    let conversion_rating = req.body.conversion_stars;
    let punctuality_rating = req.body.punctuality_stars;
    let customer_service_rating = req.body.customer_service_stars;
    let review_stars = (Number(conversion_rating) + Number(punctuality_rating) + Number(customer_service_rating)) / 3;

    // console.log("revieeeeee???>>>>",review_stars);    
    review.review_stars = review_stars;
    console.log(review);
    user.addUserReview(review)
        .then((detail) => {
            let response={
                "status":responseCode.OK,
                "data":detail
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get User Profile 
 */
router.get(`${API}user-profile`,tokenMiddleware, function (req, res, next) {

    let user_id = req.body.user_id;
    user.userDetail(user_id)
        .then((userInfo) => {
            let response={
                status:responseCode.OK,
                data:userInfo
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Update User Profile 
 */
router.put(`${API}user-profile`,tokenMiddleware, function (req, res, next) {
    let queryParameters = req.body;
    let userObj = {
        user_id: queryParameters.user_id,
        date_of_birth: queryParameters.date_of_birth,
        address: queryParameters.address,
        goc_number: queryParameters.goc_number,
        opl_number: queryParameters.opl_number,
        insurance_company: queryParameters.insurance_company,
        insurance_no: queryParameters.insurance_no,
        profile_photo: filePath+"/"+queryParameters.profile_photo,
        equipment_preferred: queryParameters.equipment_preferred,
        opl_proof: filePath+"/"+queryParameters.opl_proof,
        goc_proof: filePath+"/"+queryParameters.goc_proof,
        insurance_proof: filePath+"/"+queryParameters.insurance_proof,
        year_of_experience: queryParameters.year_of_experience,
        preferred_testing_time: queryParameters.preferred_testing_time,
        latitude: queryParameters.latitude,
        longitude: queryParameters.longitude,
    }
    let userSkills={
        skills:queryParameters.skills
    }
    // console.log(userObj)
    userRegister.updateUserProfile(userObj,userSkills)
        .then((user) => {
            let response={
                "status":responseCode.OK,
                "data":{
                    message:user
                }
            }
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        })

});

/**
 * Logout User Profile 
 */
router.put(`${API}logout`,tokenMiddleware, function (req, res, next) {
    let queryParameters = req.body;
    let userObj = {
        user_id: queryParameters.user_id,
    }
    let userSkills={
        skills:queryParameters.skills
    }
    // console.log(userObj)
    userRegister.logoutProfile(userObj,userSkills)
        .then((user) => {
            let response={
                "status":responseCode.OK,
                "data":{
                    message:user
                }
            }
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        })

});
module.exports = router;
