var jobsModel = require('../../model/locom/locom-jobs');
var storeModel = require('../../model/account/store-profile');
var jobPref = require('../../model/locom/job_preferences');
var userModel = require('../../model/account/user');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const moment = require('moment');
var appliedJob = require('../../model/locom/job-apply');

/**
 * 
 * get all posted jobs -Admin 
 */
function getAllJobs() {
    return new Promise((resolve, reject) => {

        jobsModel.findAll({
                raw: true,
                // logging: true
            })
            .then((jobsList) => {
                console.log(jobsList);
                if (jobsList == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "No Jobs Availble"))
                } else {
                    resolve(jobsList);
                }
            })
            .catch((failure) => {
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}
function jobsFeed(job_Pref) {
    return new Promise((resolve, reject) => {

        jobsModel.findAll({
                where: {
                    store_id: job_Pref.store_id,
                },
                raw: true,
                // logging: true
            })
            .then((jobsList) => {
                if (jobsList == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "No Jobs Availble"))
                } else {
                    resolve(jobsList);
                }
            })
            .catch((failure) => {
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function jobsApplicant(job_Pref) {
    return new Promise((resolve, reject) => {
        let applicantId = [];
        appliedJob.findAll({
                where: {
                    job_id: job_Pref.job_id,
                }
            })
            .then((applicants) => {
                applicants.map((applicant, index, array) => {
                    let applicant_id = applicant.user_id;
                    applicantId.push(applicant_id);
                })
                userModel.findAll({
                        where: {
                            user_id: {
                                [Op.in]: applicantId
                            }
                        },
                        raw: true,
                        // logging: true
                    })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.response(responseCode.NOT_FOUND, "No Applicants Found Against the Jobs"))
                        } else {
                            resolve(jobsList);
                        }
                    })
                    .catch((failure) => {
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });
            })
            .catch((error) => {
                reject(error);
            })

    });
}

function jobDetail(job_id) {
    return new Promise((resolve, reject) => {
        jobsModel.findOne({
                where: {
                    id: job_id,
                },
                raw: true,
                logging: true

            })
            .then((jobDetail) => {
                if (jobDetail == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {

                    resolve(jobDetail);
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function addJob(data) {
    return new Promise((resolve, reject) => {
        jobsModel.create(data, {
                raw: true,
                // logging: true
            })
            .then((jobDetail) => {
                jobsModel.count({
                        where: {
                            store_id: data.store_id,
                        },
                        raw: true,
                    })
                    .then((count) => {
                        storeModel.update({
                                total_jobs_posted: count
                            }, {
                                where: {
                                    id: data.store_id
                                }
                            })
                            .then((success) => {
                                if (jobDetail == null) {
                                    reject(responseApi.response(responseCode.NOT_FOUND, "Detail Not Available"))
                                } else {

                                    resolve(jobDetail);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    })


                    .catch((error) => {
                        reject(error);
                    })

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function setPreferences(job_Pref) {
    return new Promise((resolve, reject) => {
        jobPref.findAndCount({
                where: {
                    user_id: job_Pref.user_id
                },
                raw: true,
                // logging: true
            })
            .then((count) => {

                if (count.count > 0) {
                    // console.log("total count is ",count);
                    jobPref.update(job_Pref, {
                            where: {
                                user_id: job_Pref.user_id
                            },
                            raw: true,
                            // logging: true
                        })
                        .then((pref) => {
                            resolve(pref);
                        })
                        .catch((failure) => {
                            reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                        });
                } else {
                    jobPref.create(job_Pref, {
                            raw: true,
                            // logging: true
                        })
                        .then((pref) => {
                            resolve(pref);
                        })
                        .catch((failure) => {
                            reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                        });


                }
            })
            .catch((error) => {

            })

    });
}

function getPreferences(job_Pref) {
    return new Promise((resolve, reject) => {
        jobPref.findOne({
                where: {
                    user_id: job_Pref.user_id
                },
                raw: true,
                // logging: true
            })
            .then((pref) => {
                resolve(pref);
            })
            .catch((error) => {
                reject(error);
            })

    });
}
module.exports = {
    setPreferences,
    getPreferences,
    jobDetail,
    addJob,
    jobsFeed,
    jobsApplicant,
    getAllJobs
}