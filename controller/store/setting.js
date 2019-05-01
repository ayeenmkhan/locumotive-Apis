var seqluize = require('sequelize');
var userModel = require('../../model/account/user');
var locomModel = require('../../model/account/locom-profile');
var storeModel = require('../../model/account/store-profile');
var storeJobs = require('../../model/locom/locom-jobs');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var responseApi = require('../../response/api-response');
var nodemailer = require('../../node_modules/nodemailer');
let Op = seqluize.Op;
var notification =require('../../model/locom/notifications');


function updateStoreProfile(userData) {

    return new Promise((resolve, reject) => {
        storeModel.update(userData, {
                where: {
                    id: userData.id
                },
                raw: true
            })
            .then(profileData => {
                resolve(responseApi.response(responseCode.OK, "Profile Updated Successfully"));
            })
            .catch(err => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })

}

function getStoreProfile(storeData) {

    return new Promise((resolve, reject) => {
        storeModel.findOne({
                where: {
                    id: storeData.id
                },
                raw: true
            })
            .then(profileData => {
                storeJobs.count({
                        where: {
                            store_id: storeData.id,
                        },
                        raw: true
                    })
                    .then((count) => {
                        profileData.total_job_posted = count;
                        resolve(profileData);
                    })
                    .catch((erorr) => {
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    })
            })
            .catch(err => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
            })

    })

}
/**
 * 
 * @param {*} Get all list of stores 
 */
function getAllStores() {

    return new Promise((resolve, reject) => {
        storeModel.findAll({
                raw: true
            })
            .then(storeData => {
                resolve(storeData);

            })
            .catch(err => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })
}
/**
 * 
 * @param {*} Get all list of Notifications By ID 
 */
function getNotifications(user_id) {

    return new Promise((resolve, reject) => {
        notification.findAll({
            where:{
                reciepents: user_id
            },
                raw: true
            })
            .then(storeData => {
                resolve(storeData);

            })
            .catch(err => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    })
}
module.exports = {
    updateStoreProfile,
    getStoreProfile,
    getAllStores,
    getNotifications
}
