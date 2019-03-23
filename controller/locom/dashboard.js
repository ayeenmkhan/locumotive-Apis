var jobsModel = require('../../model/locom/locom-jobs');
var jobPref = require('../../model/locom/job_preferences');
var appliedJob = require('../../model/locom/job-apply');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const moment = require('moment');

// get all jobs listed in news feeds
function jobs(job_Pref) {

    let start_date = moment(job_Pref.start_date).format('YYYY-MM-DD');
    let end_date = moment(job_Pref.end_date).format('YYYY-MM-DD');
    let country = job_Pref.country;
    let distance = job_Pref.distance;
    let testing_time = job_Pref.testing_time;
    let min_weekday = job_Pref.min_weekday_amount;
    let min_weekend = job_Pref.min_weekend_amount;
    let user_id = job_Pref.user_id;

    return new Promise((resolve, reject) => {

        var jobId = [];
        appliedJob.findAll({
                where: {
                    user_id: user_id,
                    status: 0
                },
                // logging:true,
                raw: true
            })
            .then((appliedJob) => {
                // console.log("Applied job",appliedJob)
                if (appliedJob == null || appliedJob != '') {
                    appliedJob.map((job, index, array) => {
                        // console.log("MAP FUNCTION",job.job_id)
                        let jobID = job.job_id
                        jobId.push(jobID);
                    });
                }
                console.log("aPPLIED JOB ID", jobId);
                jobsModel.findAll({
                        where: {
                            id: {
                                [Op.notIn]: jobId,
                            },
                            start_date: {
                                [Op.lte]: new Date(end_date),
                                [Op.gte]: new Date(start_date),
                            },
                            distance: {
                                [Op.lte]: distance
                            },
                            min_weekday_amount: {
                                [Op.lte]: min_weekday
                            },
                            min_weekend_amount: {
                                [Op.lte]: min_weekend
                            },
                            country: country,
                            testing_time: testing_time,
                            status: 0,
                        },
                        raw: true,
                        // logging: true

                    })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.response(responseCode.NOT_FOUND, "No Jobs Availble from give preferences"))
                        } else {

                            resolve(jobsList);
                        }

                    })
                    .catch((failure) => {
                        console.log(failure);
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(error)
            })


    });
}
// get pending jobs
function jobPending(job_Pref) {

    return new Promise((resolve, reject) => {

        var jobId = [];
        appliedJob.findAll({
                where: {
                    user_id: job_Pref.user_id,
                    status: 0
                },
                // logging:true,
                raw: true
            })
            .then((appliedJob) => {
                // console.log("Applied job",appliedJob)
                if (appliedJob == null || appliedJob != '') {
                    appliedJob.map((job, index, array) => {
                        // console.log("MAP FUNCTION",job.job_id)
                        let jobID = job.job_id
                        jobId.push(jobID);
                    });
                }
                console.log("aPPLIED JOB ID", jobId);
                jobsModel.findAll({
                        where: {
                            id: {
                                [Op.in]: jobId,
                            },
                        },
                        raw: true,
                        // logging: true

                    })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.response(responseCode.NOT_FOUND, "No Pending Jobs Availble"))
                        } else {

                            resolve(jobsList);
                        }

                    })
                    .catch((failure) => {
                        console.log(failure);
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(error)
            })


    });
}

// get Booked jobs
function jobBooked(job_Pref) {

    return new Promise((resolve, reject) => {

        var jobId = [];
        appliedJob.findAll({
                where: {
                    user_id: job_Pref.user_id,
                    status: 1
                },
                // logging:true,
                raw: true
            })
            .then((appliedJob) => {
                // console.log("Applied job",appliedJob)
                if (appliedJob == null || appliedJob != '') {
                    appliedJob.map((job, index, array) => {
                        // console.log("MAP FUNCTION",job.job_id)
                        let jobID = job.job_id
                        jobId.push(jobID);
                    });
                }
                console.log("aPPLIED JOB ID", jobId);
                jobsModel.findAll({
                        where: {
                            id: {
                                [Op.in]: jobId,
                            },
                        },
                        raw: true,
                        // logging: true

                    })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.response(responseCode.NOT_FOUND, "No Pending Jobs Availble"))
                        } else {

                            resolve(jobsList);
                        }

                    })
                    .catch((failure) => {
                        console.log(failure);
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(error)
            })


    });
}

// get Completed jobs
function jobCompleted(job_Pref) {

    return new Promise((resolve, reject) => {

        var jobId = [];
        appliedJob.findAll({
                where: {
                    user_id: job_Pref.user_id,
                    status: 2
                },
                // logging:true,
                raw: true
            })
            .then((appliedJob) => {
                // console.log("Applied job",appliedJob)
                if (appliedJob == null || appliedJob != '') {
                    appliedJob.map((job, index, array) => {
                        // console.log("MAP FUNCTION",job.job_id)
                        let jobID = job.job_id
                        jobId.push(jobID);
                    });
                }
                // console.log("aPPLIED JOB ID", jobId);
                jobsModel.findAll({
                        where: {
                            id: {
                                [Op.in]: jobId,
                            },
                        },
                        raw: true,
                        // logging: true

                    })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.response(responseCode.NOT_FOUND, "No Pending Jobs Availble"))
                        } else {

                            resolve(jobsList);
                        }

                    })
                    .catch((failure) => {
                        console.log(failure);
                        reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(error)
            })


    });
}

function jobRejeted(job) {
    return new Promise((resolve, reject) => {
        appliedJob.destroy({
                where: {
                    job_id: job.job_id,
                    user_id: job.user_id,
                },
                raw: true,
                // logging: true

            })
            .then((jobDetail) => {
                if (jobDetail == null) {
                    reject(responseApi.response(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {

                    resolve("Job Application Rejected Successfully");
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
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

function setPreferences(job_Pref) {
    return new Promise((resolve, reject) => {
        jobPref.findAndCount({
                where: {
                    user_id: job_Pref.user_id
                },
                raw: true,
                logging: true
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
                reject(error);
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
                reject(responseCode.DB_ERROR, responseMessage.DB_ERROR);
            })

    });
}

function jobApply(data) {
    return new Promise((resolve, reject) => {
        appliedJob.create(data, {
                raw: true,
                // logging: true
            })
            .then((jobDetail) => {
                appliedJob.count({
                        where: {
                            job_id: data.job_id
                        }
                    })
                    .then((count) => {
                        jobsModel.update({
                                intrested: count,
                            }, {
                                where: {
                                    id: data.job_id
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
                                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                            })
                    })
                    .catch((error) => {
                        reject(responseCode.DB_ERROR, responseMessage.DB_ERROR)
                    })

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function jobOfferCancel(data) {
    return new Promise((resolve, reject) => {
        appliedJob.update({
                status: data.status,
                description: data.description
            }, {
                where: {
                    user_id: data.user_id,
                    job_id: data.job_id
                },
                raw: true,
                // logging: true
            })
            .then((jobDetail) => {
                resolve(responseApi.response(responseCode.OK, "Cancel Request sent successfully "))
            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.response(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

// get Payment History  jobs LIST
function getPaymentHistory(job_Pref) {

    return new Promise((resolve, reject) => {

        var jobId = [];
        appliedJob.findAll({
                where: {
                    user_id: job_Pref.user_id,
                    status: 2
                },
                include: [{
                    model: jobsModel,
                }],
                // logging:true,
                raw: true
            })
            .then((appliedJob) => {
                let historyArray = [];
                appliedJob.map((history, index) => {
                    let historyData = {
                        user_id: history.user_id,
                        job_id: history.job_id,
                        status: history.status,
                        description: history.description,
                        payment_status: history.payment_status,
                        job_title: historyc['locom_job.job_title'],
                        amount: history['locom_job.perday_amount'],
                    }
                    historyArray.push(historyData);
                })
                resolve(historyArray);
            })
            .catch((error) => {
                reject(error)
            })


    });
}

module.exports = {
    jobs,
    setPreferences,
    getPreferences,
    jobDetail,
    addJob,
    jobApply,
    jobPending,
    jobBooked,
    jobRejeted,
    jobCompleted,
    jobOfferCancel,
    getPaymentHistory
}