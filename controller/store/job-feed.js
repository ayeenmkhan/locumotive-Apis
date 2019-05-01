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
var notification =require('../../model/locom/notifications');
var notify =require('../../middleware/notification');
const Sequelize = require('sequelize');
let seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql'
});
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
                if (jobsList == null ) {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Jobs Availble"))
                } else {
                    let response={
                        "status":responseCode.OK,
                        "data":jobsList
                    }
                    resolve(response);
                }
            })
            .catch((failure) => {
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                logging: true
            })
            .then((jobsList) => {
                console.log(jobsList);
                if (jobsList == null || jobsList == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Jobs Availble"))
                } else {
                   
                    resolve(jobsList);
                }
            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            });
    });
}

function jobsApplicant(job_Pref) {
    return new Promise((resolve, reject) => {
        let applicantId = [];
        appliedJob.findAll({
                where: {
                    job_id: job_Pref.job_id,
                    status:0
                }
            })
            .then((applicants) => {
                applicants.map((applicant, index, array) => {
                    let applicant_id = applicant.user_id;
                    applicantId.push(applicant_id);
                })
                // console.log(applicantId);
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
                        if (jobsList == null || jobsList == '') {
                            reject(responseApi.error(responseCode.NOT_FOUND, "No Applicants Found Against the Jobs"))
                        } else {
                            resolve(jobsList);
                        }
                    })
                    .catch((failure) => {
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
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
                include: [{
                    model: storeModel,
                }],
                raw: true,
                logging: true

            })
            .then((jobDetail) => {
                if (jobDetail == null || jobDetail == '') {
                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"))
                } else {
                    let response={
                        "id": jobDetail.id,
                        "job_title": jobDetail.job_title,
                        "job_id": jobDetail.job_id,
                        "country": jobDetail.country,
                        "city": jobDetail.city,
                        "distance": jobDetail.distance,
                        "start_date": jobDetail.start_date,
                        "end_date": jobDetail.start_date,
                        "perday_amount": jobDetail.perday_amount,
                        "start_time": jobDetail.start_time,
                        "end_time": jobDetail.end_time,
                        "min_weekday_amount": jobDetail.min_weekday_amount,
                        "min_weekend_amount": jobDetail.min_weekend_amount,
                        "testing_time": jobDetail.testing_time,
                        "job_detail": jobDetail.jobDetail,
                        "payment_status": jobDetail.payment_status,
                        "skills": jobDetail.skills,
                        "address":jobDetail.address,
                        "parking": jobDetail.parking,
                        "pre_test": jobDetail.pre_test,
                        "field_test": jobDetail.field_test,
                        "phorotoper": jobDetail.phorotoper,
                        "trail_frame": jobDetail.trail_frame,
                        "store_id": jobDetail.store_id,
                        "intrested": jobDetail.intrested,
                        "profile_picture": jobDetail["store_profile.profile_picture"],
                    }

                    resolve(response);
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
                                if (jobDetail == null || jobDetail == '') {
                                    reject(responseApi.error(responseCode.NOT_FOUND, "Detail Not Available"));
                                } else {

                                    resolve(jobDetail);
                                }
                            })
                            .catch((error) => {
                                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                            })
                    })


                    .catch((error) => {
                        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
                    })

            })
            .catch((failure) => {
                console.log(failure);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR));
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
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })

    });
}

// Approved Job
function approvedJob(info){
    return new Promise((resolve, reject) => {
    appliedJob.update({
        status:info.status
    },{
        where: {
            job_id: info.job_id,
            user_id: info.user_id,
        }
    })
    .then((approved) => {
        let response={
            "status":responseCode.OK,
            "data":{
                "message":"Action Succefull"
            }
        }
        if(info.status==1){
        var notif={
            message:"Your job application is approved",
            reciepents:info.user_id,
            job_id:info.job_id
        }
    }else if(info.status==3){
        var notif={
            message:"Your job application is Rejected",
            reciepents:info.user_id,
            job_id:info.job_id
        }
    }
        notification.create(notif,{
          raw:true,  
        })
        .then((success)=>{
            
            notify.getTokens(info.user_id)
            .then((tokenArray) => {
                let token = tokenArray.fcm_token;

                console.log("FCM TOKEN IS",success);
                /**
                * FIREBASE CLOUD MESSAGING
                */
                // let calendarData = JSON.stringify(pushData);
                var dataMessage = {
                    // collapse_type:"type_a",
                    data: {
                        // calendar: calendarData,
                        // title: "Islamic App New City",
                        // body: "New city"+req.body.city_en +"Added to the application"
                    },
                    notification: {
                        title: "Locum Store",
                        body: notif.message
                    }
                };
                notify.sendNotification(dataMessage, token);

                resolve(response);
            })
            .catch((err) => {
                console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
            })
            
        })
        .catch((error)=>{
            reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
        })
      
    })
    .catch((error) => {
        reject(responseApi.error(responseCode.DB_ERROR, responseMessage.DB_ERROR))
    })

});
}
// get Booked/Approved jobs for store
function jobBooked(job_Pref) {
    return new Promise((resolve, reject) => {
    let store_id =job_Pref.store_id;
    let Query = `SELECT job_applicants.*,locom_jobs.*,users.first_name,users.last_name,locom_profiles.*
    FROM job_applicants
    INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
    INNER JOIN users ON job_applicants.user_id=users.user_id
    INNER JOIN locom_profiles ON job_applicants.user_id=locom_profiles.user_id
    WHERE job_applicants.store_id=${store_id} and job_applicants.status=1`;
    seq.query(Query, {
        model: appliedJob,
    })
        .then((res) => {
            if(res==null || res==''){
                reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
            }else{
            resolve(res);
            }
        })
        .catch((err) => {
        
            reject(responseApi.error(responseCode.DB_ERROR,responseMessage.DB_ERROR));
        });
});
}
function jobCompleted(jobInfo){
    return new Promise((resolve, reject) => {
        let store_id =jobInfo.store_id;
        let Query = `SELECT job_applicants.*,locom_jobs.*,users.first_name,users.last_name,locom_profiles.*
        FROM job_applicants
        INNER JOIN locom_jobs ON job_applicants.job_id=locom_jobs.id
        INNER JOIN users ON job_applicants.user_id=users.user_id
        INNER JOIN locom_profiles ON job_applicants.user_id=locom_profiles.user_id
        WHERE job_applicants.store_id=${store_id} and job_applicants.status=2`;
        seq.query(Query, {
            model: appliedJob,
        })
            .then((res) => {
                if(res==null || res==''){
                    reject(responseApi.error(responseCode.NOT_FOUND, "No Data Available"));
                }else{
                resolve(res);
                }
            })
            .catch((err) => {
            console.log(err);
                reject(responseApi.error(responseCode.DB_ERROR,responseMessage.DB_ERROR));
            });
    });
}
module.exports = {
    setPreferences,
    getPreferences,
    jobDetail,
    addJob,
    jobsFeed,
    jobsApplicant,
    getAllJobs,
    approvedJob,
    jobBooked,
    jobCompleted
}