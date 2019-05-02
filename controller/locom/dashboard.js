var jobsModel = require('../../model/locom/locom-jobs');
var jobPref = require('../../model/locom/job_preferences');
var appliedJob = require('../../model/locom/job-apply');
var store = require('../../model/account/store-profile');
const Op = require('sequelize').Op;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
const moment = require('moment');
var notification =require('../../model/locom/notifications');
var notify= require('../../middleware/notification');
const Sequelize = require('sequelize');
let seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql'
});
// get all jobs listed in news feeds
function jobs(job_Pref) {
    // console.log("MOdel call job", job_Pref.user_id);
    let start_date = moment(job_Pref.start_date).format('YYYY-MM-DD');
    let end_date = moment(job_Pref.end_date).format('YYYY-MM-DD');
    // let country = job_Pref.country;
    let county = job_Pref.county;
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
                // console.log("aPPLIED JOB ID", jobId);
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
                        county: county,
                        testing_time: testing_time,
                        //status: 0,
                    },
                    include: [{
                        model: store,
                    }],
                    raw: true,
                    logging: true

                })
                    .then((jobsList) => {
                        if (jobsList == null) {
                            reject(responseApi.error(responseCode.NOT_FOUND, "No Jobs Availble from give preferences"))
                        } else {
                            let jobsFeed = [];
                            jobsList.map((job, index, array) => {
                                let response = {
                                    "id": job.id,
                                    "job_title": job.job_title,
                                    "start_date": job.start_date,
                                    "end_date": job.end_date,
                                    "perday_amount": job.perday_amount,
                                    "start_time": job.start_time,
                                    "end_time": job.end_time,
                                    "store_id": job.store_id,
                                    "min_weekday_amount": job.min_weekday_amount,
                                    "job_id": job.job_id,
                                    "county": job.county,
                                    "country": job.country,
                                    "city": job.city,
                                    "distance": job.distance,
                                    "min_weekend_amount": job.min_weekend_amount,
                                    "testing_time": job.testing_time,
                                    "job_detail": job.job_detail,
                                    "payment_status": job.payment_status,
                                    "address": job.address,
                                    "parking": job.parking,
                                    "pre_test": job.pre_test,
                                    "field_test": job.field_test,
                                    "phorotoper": job.phorotoper,
                                    "trail_frame": job.trail_frame,
                                    "contact_lens": job.contact_lens,
                                    "store_id": job.store_id,
                                    "intrested": job.intrested,
                                    "store_name": job['store_profile.store_name'],
                                    "profile_picture": job['store_profile.profile_picture'],
                                    "latitude": job['store_profile.latitude'],
                                    "longitude": job['store_profile.longitude']
                                }
                                jobsFeed.push(response);

                            })
                            resolve(jobsFeed);
                        }
                    })
                    .catch((failure) => {
                        console.log(failure);
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })


    });
}
//Get all job without preference setting
function jobsNotPref(job_Pref) {
    // console.log("MOdel call job",job_Pref.user_id);
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
                // console.log("aPPLIED JOB ID", jobId);
                jobsModel.findAll({
                    where: {
                        id: {
                            [Op.notIn]: jobId,
                        },
                    },
                    include: [{
                        model: store,
                    }],
                    raw: true,
                    // logging: true

                })
                    .then((jobsList) => {
                        if (jobsList == null || jobsList == '') {
                            reject(responseApi.error(responseCode.NOT_FOUND, "No Jobs Availble from give preferences"))
                        } else {
                            // console.log("result data is",jobsList);
                            let jobsFeed = [];
                            jobsList.map((job, index, array) => {
                                let response = {
                                    "id": job.id,
                                    "job_title": job.job_title,
                                    "start_date": job.start_date,
                                    "end_date": job.end_date,
                                    "perday_amount": job.perday_amount,
                                    "start_time": job.start_time,
                                    "end_time": job.end_time,
                                    "store_id": job.store_id,
                                    "min_weekday_amount": job.min_weekday_amount,
                                    "job_id": job.job_id,
                                    "county": job.county,
                                    "country": job.country,
                                    "city": job.city,
                                    "distance": job.distance,
                                    "min_weekend_amount": job.min_weekend_amount,
                                    "testing_time": job.testing_time,
                                    "job_detail": job.job_detail,
                                    "payment_status": job.payment_status,
                                    "address": job.address,
                                    "parking": job.parking,
                                    "pre_test": job.pre_test,
                                    "field_test": job.field_test,
                                    "phorotoper": job.phorotoper,
                                    "trail_frame": job.trail_frame,
                                    "contact_lens": job.contact_lens,
                                    "store_id": job.store_id,
                                    "intrested": job.intrested,
                                    "store_name": job['store_profile.store_name'],
                                    "profile_picture": job['store_profile.profile_picture'],
                                    "latitude": job['store_profile.latitude'],
                                    "longitude": job['store_profile.longitude']
                                }
                                jobsFeed.push(response);
                            })

                            // console.log("Array of jobs is ",jobsFeed);
                            resolve(jobsFeed);
                        }

                    })
                    .catch((failure) => {
                        // console.log(failure);
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    });

            })
            .catch((error) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })


    });
}
// get pending jobs
function jobPending(job_Pref) {
    return new Promise((resolve, reject) => {
        let user_id = job_Pref.user_id;
        let Query = `SELECT job_applicants.*, locom_jobs.*,store_profiles.latitude,store_profiles.longitude,store_profiles.store_name,store_profiles.profile_picture
        FROM job_applicants
        INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
        INNER JOIN store_profiles ON job_applicants.store_id=store_profiles.id
        WHERE job_applicants.user_id=${user_id} and job_applicants.status=0`;
        seq.query(Query, {
            model: appliedJob,
        })
            .then((res) => {
                if (res == null || res == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                // console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
            });
    });
}

// get Booked jobs
function jobBooked(job_Pref) {

    return new Promise((resolve, reject) => {
        let user_id = job_Pref.user_id;
        let Query = `SELECT job_applicants.*, locom_jobs.*,store_profiles.latitude,store_profiles.longitude,store_profiles.store_name,store_profiles.id,store_profiles.profile_picture
        FROM job_applicants
        INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
        INNER JOIN store_profiles ON job_applicants.store_id=store_profiles.id
        WHERE job_applicants.user_id=${user_id} and job_applicants.status=1`;
        seq.query(Query, {
            model: appliedJob,
        })
            .then((res) => {
                console.log(res);
                if (res == null || res == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
            });
    });
}
// get Completed jobs
function jobCompleted(job_Pref) {
    return new Promise((resolve, reject) => {
        let user_id = job_Pref.user_id;
        let Query = `SELECT job_applicants.*, locom_jobs.*,store_profiles.latitude,store_profiles.longitude,store_profiles.store_name,store_profiles.profile_picture
        FROM job_applicants
        INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
        INNER JOIN store_profiles ON job_applicants.store_id=store_profiles.id
        WHERE job_applicants.user_id=${user_id} and job_applicants.status=2`;
        seq.query(Query, {
            model: appliedJob,
        })
            .then((res) => {
                if (res == null || res == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
            });
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
                if (jobDetail == null || jobDetail == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {
                    var notif = {
                        message: "Job offer Cancel by user",
                        store_id: job.store_id,
                        job_id: job.job_id,
                        // submission_date: new Date('Y-m-d HH:mm:ss')
                    }
                    notification.create(notif, {
                        raw: true,
                    })
                    .then((succes)=>{
                        notify.getStoreTokens(job.store_id)
                        .then((tokenArray) => {
                            let token = tokenArray.fcm_token;
                           // console.log("FCM TOKEN IS",token);
                            /**
                            * FIREBASE CLOUD MESSAGING
                            */
                            // let pushData = {
                            //     code: 100,
                            //     city_id:city.id,
                            //     message_en: "New City Added",
                            //     message_ar: req.body.event_message_ar,
                            //     // notification_type: req.body.notification_type,
                            // }
                            // let calendarData = JSON.stringify(pushData);
                            var message = {
                                // collapse_type:"type_a",
                                data: {
                                    // calendar: calendarData,
                                    // title: "Islamic App New City",
                                    // body: "New city"+req.body.city_en +"Added to the application"
                                },
                                notification: {
                                    title: "Job Application",
                                    body: notif.message
                                }
                            };
                            notify.sendNotification(message, token);
                            resolve("Job Application Rejected");
                        })
                        .catch((err) => {
                            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                        })
                    })
                    .catch((err)=>{
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    })
              
                    
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                if (jobDetail == null || jobDetail == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {

                    resolve(jobDetail);
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                if (jobDetail == null || jobDetail == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {

                    resolve(jobDetail);
                }

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function setPreferences(job_Pref) {
    return new Promise((resolve, reject) => {
        jobPref.findAndCountAll({
            where: {
                user_id: job_Pref.user_id
            },
            raw: true,
            logging: true
        })
            .then((count) => {

                if (count.count > 0) {
                    console.log("total count is ", count);
                    jobPref.update(job_Pref, {
                        where: {
                            user_id: job_Pref.user_id
                        },
                        raw: true,
                        // logging: true
                    })
                        .then((pref) => {
                            resolve("Prefrences Succefully updated");
                        })
                        .catch((failure) => {
                            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                        });
                }
            })
            .catch((error) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                                if (jobDetail == null || jobDetail == '') {
                                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"))
                                } else {
                                    // notification saved 
                                    var notif = {
                                        message: "New Application Recieved for the job",
                                        store_id: data.store_id,
                                        job_id: data.job_id
                                    }
                                    notification.create(notif, {
                                        raw: true,
                                    })
                                        .then((success) => {
                                            notify.getStoreTokens(data.store_id)
                                            .then((tokenArray) => {
                                                let token = tokenArray.fcm_token;

                                                // console.log("FCM TOKEN IS",token);
                                                /**
                                                * FIREBASE CLOUD MESSAGING
                                                */
                                                // let pushData = {
                                                //     code: 100,
                                                //     city_id:city.id,
                                                //     message_en: "New City Added",
                                                //     message_ar: req.body.event_message_ar,
                                                //     // notification_type: req.body.notification_type,
                                                // }
                                                // let calendarData = JSON.stringify(pushData);
                                                var message = {
                                                    // collapse_type:"type_a",
                                                    data: {
                                                        // calendar: calendarData,
                                                        // title: "Islamic App New City",
                                                        // body: "New city"+req.body.city_en +"Added to the application"
                                                    },
                                                    notification: {
                                                        title: "Job Application",
                                                        body: notif.message
                                                    }
                                                };
                                                notify.sendNotification(message, token);

                                                resolve(jobDetail);
                                            })
                                            .catch((err) => {
                                                console.log("first",err);
                                                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                                            })
                                        })
                                        .catch((error) => {
                                            console.log("second",err);
                                            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                                        })

                                }

                            })
                            .catch((error) => {
                                console.log("thord",err);
                                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                            })
                    })
                    .catch((error) => {
                        console.log("forth",err);
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
                    })

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                resolve("Cancel Request sent successfully ")
            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

// get Payment History  jobs LIST
function getPaymentHistory(job_Pref) {
    return new Promise((resolve, reject) => {
        let user_id = job_Pref.user_id;
        let Query = `SELECT job_applicants.*,locom_jobs.job_title,locom_jobs.perday_amount,locom_jobs.start_date,locom_jobs.end_date
        FROM job_applicants
        INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
        WHERE job_applicants.user_id=${user_id} and job_applicants.status=2`;
        seq.query(Query, {
            model: appliedJob,
        })
            .then((res) => {
                console.log(res);
                if (res == null || res == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
                } else {
                    resolve(res);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
            });
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
    getPaymentHistory,
    jobsNotPref
}