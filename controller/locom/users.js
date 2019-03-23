var userModel = require('../../model/account/user');
var profileDetail = require('../../model/account/locom-profile');
var review = require('../../model/account/user-review');
var user = require('../../model/account/user');
var appliedJob = require('../../model/locom/job-apply');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const moment = require('moment');

// get  user detail 
function userDetail(user_id) {
    console.log("user id is", user_id);
    return new Promise((resolve, reject) => {
        userModel.findOne({
                where: {
                    user_id: user_id,
                },
                include: [{
                    model: profileDetail,
                }],
                raw: true,
                // logging: true
            })
            .then((detail) => {
                if (detail == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {
                    // console.log(detail['locom_profile.skills']);
                    let userInfo = {
                        user_id: detail.user_id,
                        first_name: detail.first_name,
                        last_name: detail.last_name,
                        email: detail.email,
                        phone_no: detail.phone_no,
                        tc_box: detail.tc_box,
                        date_of_birth: detail['locom_profile.date_of_birth'],
                        address: detail['locom_profile.address'],
                        goc_number: detail['locom_profile.goc_number'],
                        opl_number: detail['locom_profile.opl_number'],
                        insurance_company: detail['locom_profile.insurance_company'],
                        insurance_no: detail['locom_profile.insurance_no'],
                        profile_photo: detail['locom_profile.profile_photo'],
                        equipment_preferred: detail['locom_profile.equipment_preferred'],
                        skills: detail['locom_profile.skills'],
                        year_of_experience: detail['locom_profile.year_of_experience'],
                        preferred_testing_time: detail['locom_profile.preferred_testing_time']
                    }
                    resolve(userInfo);
                }
            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}
// get All users detail Admin Panel
function getAllUsers() {
    // console.log("user id is", user_id);
    return new Promise((resolve, reject) => {
        userModel.findAll({
                include: [{
                    model: profileDetail,
                }],
                raw: true,
                // logging: true
            })
            .then((detail) => {
                if (detail == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {
                    // console.log(detail['locom_profile.skills']);
                   let users=[];
                   detail.map((user,index,array)=>{
                    let userInfo = {
                        user_id: user.user_id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        phone_no: user.phone_no,
                        tc_box: user.tc_box,
                        date_of_birth: user['locom_profile.date_of_birth'],
                        address: user['locom_profile.address'],
                        goc_number: user['locom_profile.goc_number'],
                        opl_number: user['locom_profile.opl_number'],
                        insurance_company: user['locom_profile.insurance_company'],
                        insurance_no: user['locom_profile.insurance_no'],
                        profile_photo: user['locom_profile.profile_photo'],
                        equipment_preferred: user['locom_profile.equipment_preferred'],
                        skills: user['locom_profile.skills'],
                        year_of_experience: user['locom_profile.year_of_experience'],
                        preferred_testing_time: user['locom_profile.preferred_testing_time']
                    }
                    users.push(userInfo)
                   })
            
                    resolve(users);
                }
            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}
// get  user Review Detail 
function userReview(user_id) {
    // console.log("user id is", user_id);
    return new Promise((resolve, reject) => {
        review.findAll({
                where: {
                    user_id: user_id,
                },
                raw: true,
                // logging: true
            })
            .then((detail) => {
                if (detail == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "Reviews Not Available"))
                } else {
                    resolve(detail);
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}
// Add  user Review Detail 
function addUserReview(reviewInfo) {
    // console.log("user id is", user_id);
    return new Promise((resolve, reject) => {
        review.create(reviewInfo, {
                raw: true,
                // logging: true
            })
            .then((detail) => {
                appliedJob.update({
                        status: 2
                    }, {
                        where: {
                            user_id: reviewInfo.user_id,
                            job_id: reviewInfo.job_id
                        }
                    })
                    .then((success) => {
                        resolve(detail);
                    })
                    .catch((error) => {
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    })



            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}



module.exports = {
    userDetail,
    userReview,
    addUserReview,
    getAllUsers
    
}