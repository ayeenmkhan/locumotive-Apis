var express = require('express');
var router = express.Router();
var storeProfile = require('../../controller/store/setting');
var userRegister = require('../../controller/account/register');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var tokenMiddleware = require('../../middleware/authentication/jwt');


/**
 * Update store Profile
 */
router.put(`${API}store-profile`,tokenMiddleware, function (req, res, next) {
    let queryParameters = req.body;
    let storeObj = {
        id:queryParameters.store_id,
        user_id: queryParameters.user_id,
        store_name: queryParameters.store_name,
        address: queryParameters.address,
        weekend_rate: queryParameters.weekend_rate,
        equipment: queryParameters.equipment,
        parking_available: queryParameters.parking_available,
        pre_test_required: queryParameters.pre_test_required,
        detail: queryParameters.detail,
        latitude: queryParameters.latitude,
        longitude: queryParameters.longitude,
        prefered_testing_time: queryParameters.preferred_testing_time,
    }
    // console.log(userData)
    storeProfile.updateStoreProfile(storeObj)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
           // console.log(error);
            res.json(error)
        })

});

/**
 * Get Store Profile 
 */
router.get(`${API}store-profile/:id`,tokenMiddleware, function (req, res, next) {

    let store_id = req.params.id;

    let store = {
        id: store_id,
    }
    storeProfile.getStoreProfile(store)
        .then((storeProfile) => {
            let response={
                "status":responseCode.OK,
                "data":storeProfile
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get ALL USER NOTIFICATIONS 
 */
router.get(`${API}notifications/:id`,tokenMiddleware, function (req, res, next) {

    let user_id = req.params.id;
    console.log(user_id)
    storeProfile.getNotifications(user_id)
        .then((notifications) => {
            let response={
                "status":responseCode.OK,
                "data":notifications
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Add new store Profile
 */

router.post(`${API}new-account`,tokenMiddleware, function (req, res, next) {
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
        profile_picture: process.env.FILE_ADDRESS+"/"+queryParameters.profile_picture,
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

module.exports = router;
