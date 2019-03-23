var express = require('express');
var router = express.Router();
var storeJobs = require('../../controller/store/job-feed');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');


/**
 * Add  new jobs feed data
 */
router.post(`${API}jobs`, function (req, res, next) {

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
    }
    //console.log(jobData);
    storeJobs.addJob(jobData)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * get news jobs feed data store
 */
router.get(`${API}store-jobs`, function (req, res, next) {

    let queryParameters = req.query;
    let storeInfo ={
        store_id :queryParameters.store_id
    }
    storeJobs.jobsFeed(storeInfo)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
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
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Get job Details against ID
 */
router.get(`${API}job-detail/:id`, function (req, res, next) {

    let job_id = req.params.id;
    locomJobs.jobDetail(job_id)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Set preferences
 */
router.post(`${API}preferences`, function (req, res, next) {

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
router.get(`${API}preferences`, function (req, res, next) {

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
