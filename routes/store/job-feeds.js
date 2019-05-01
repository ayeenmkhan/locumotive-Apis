var express = require('express');
var router = express.Router();
var storeJobs = require('../../controller/store/job-feed');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
var tokenMiddleware = require('../../middleware/authentication/jwt');

/**
 * Add  new jobs feed data
 */
router.post(`${API}jobs`,tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobData = {
        start_date: queryParameters.start_date,
        end_date: queryParameters.end_date,
        job_title: queryParameters.job_title,
        country: queryParameters.country,
        distance: queryParameters.distance,
        testing_time: queryParameters.testing_time,
        store_id: queryParameters.store_id,
        // min_weekday_amount: queryParameters.min_weekday_amount,
        // min_weekend_amount: queryParameters.min_weekend_amount,
        job_id: queryParameters.job_id,
        no_posts: queryParameters.no_posts,
        perday_amount: queryParameters.perday_amount,
        skills: queryParameters.skill,
        job_detail: queryParameters.job_detail,
        address: queryParameters.address,
        parking: queryParameters.parking,
        pre_test: queryParameters.pre_test,
        field_test: queryParameters.field_test,
        phorotoper: queryParameters.phorotoper,
        trail_frame: queryParameters.trail_frame,
        contact_lens: queryParameters.contact_lens,
    }
    //console.log(jobData);
    storeJobs.addJob(jobData)
        .then((jobFeeds) => {
            let response={
                "status":responseCode.OK,
                "data":jobFeeds
            }
            res.json(response);
        })
        .catch((err) => {
            // console.log(err);
            res.json(err);
        });
});
/**
 * get news jobs feed data store
 */
router.get(`${API}store-jobs`,tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;
    let storeInfo ={
        store_id :queryParameters.store_id
    }
    storeJobs.jobsFeed(storeInfo)
        .then((jobFeeds) => {
            let response={
                "status":responseCode.OK,
                "data":jobFeeds
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * get Applicants Against jobs @ store
 */
router.get(`${API}applicants`, function (req, res, next) {

    let queryParameters = req.query;
    let storeInfo ={
        job_id :queryParameters.job_id
    }
    storeJobs.jobsApplicant(storeInfo)
        .then((jobFeeds) => {
            let response={
                "status":responseCode.OK,
                "data":jobFeeds
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Approve job applicant 
 */
router.post(`${API}approved`,tokenMiddleware, function (req, res, next) {

    let info ={
        job_id:req.body.job_id,
        user_id:req.body.user_id,
        status:req.body.status,
    }
    storeJobs.approvedJob(info)
        .then((jobFeeds) => {
            res.json(jobFeeds);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get Booked/approved jobs for Store 
 */
router.get(`${API}store-booked-jobs/:id`,tokenMiddleware, function (req, res, next) {

    let store_id = req.params.id;
// console.log(queryParameters.store_id)
    let jobPref = {
        store_id: store_id,
    }
    storeJobs.jobBooked(jobPref)
        .then((jobFeeds) => {
            // console.log("booked jobs",jobFeeds);
           
            let response={
                status:responseCode.OK,
                data:jobFeeds,
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Get Booked/approved jobs for Store 
 */
router.get(`${API}store-completed-jobs/:id`,tokenMiddleware, function (req, res, next) {

    let store_id = req.params.id;
// console.log(queryParameters.store_id)
    let jobPref = {
        store_id: store_id,
    }
    storeJobs.jobCompleted(jobPref)
        .then((jobFeeds) => {
            // console.log("booked jobs",jobFeeds);
            let response={
                status:responseCode.OK,
                data:jobFeeds,
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Get job Details against ID
 */
router.get(`${API}store-job-detail/:id`,tokenMiddleware, function (req, res, next) {

    let job_id = req.params.id;
    storeJobs.jobDetail(job_id)
        .then((jobFeeds) => {
            let response={
                "status":responseCode.OK,
                "data":jobFeeds
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Set preferences
 */
router.post(`${API}preferences`,tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
        start_date: queryParameters.start_date,
        end_date: queryParameters.end_date,
        country: queryParameters.country,
        distance: queryParameters.distance,
        testing_time: queryParameters.testing_time,
        min_weekday_amount: queryParameters.min_weekday_amount,
        min_weekend_amount: queryParameters.min_weekend_amount,
    }
    locomJobs.setPreferences(jobPref)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get preferences 
 */
router.get(`${API}preferences`,tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
    }
    locomJobs.getPreferences(jobPref)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});


module.exports = router;
