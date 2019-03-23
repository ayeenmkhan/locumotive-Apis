var express = require('express');
var router = express.Router();
var storeProfile = require('../../controller/store/setting');
var userRegister = require('../../controller/account/register');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');



/**
 * Update store Profile
 */
router.put(`${API}store-profile`, function (req, res, next) {
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
router.get(`${API}store-profile`, function (req, res, next) {

    let queryParameters = req.body;

    let store = {
        id: queryParameters.store_id,
    }
    storeProfile.getStoreProfile(store)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Add new store Profile
 */

router.post(`${API}new-account`, function (req, res, next) {
    let queryParameters = req.body;
    let storeObj = {
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
