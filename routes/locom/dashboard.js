var express = require('express');
var router = express.Router();
var locomJobs = require('../../controller/locom/dashboard');
var jwt = require('jsonwebtoken');
let API = process.env.API_PREFIX;
var responseApi = require('../../response/api-response');
var responseCode = require('../../response/response-codes');
var responseMessage = require('../../response/response-messages');
let tokenMiddleware = require('../../middleware/authentication/jwt');
/**
 * get news jobs feed data
 */
router.get(`${API}jobs`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;

    let jobPref = {
        user_id: queryParameters.user_id,
    }
    // console.log("jobbbbb",jobPref);
    locomJobs.getPreferences(jobPref)
        .then((jobFeeds) => {
            if (jobFeeds == null || jobFeeds == '') {
                // console.log("Null feeds data is", jobFeeds);
                locomJobs.jobsNotPref(jobPref)
                    .then((jobFeed) => {
                        let response = {
                            "status": responseCode.OK,
                            "data": jobFeed
                        }
                        res.json(response);
                    })
                    .catch((err) => {
                        // console.log(err);
                        res.json(err);
                    })
            } else {
                // console.log("Jobs fedd data is", jobFeeds);
                locomJobs.jobs(jobFeeds)
                    .then((jobFeeds) => {
                        let response = {
                            "status": responseCode.OK,
                            "data": jobFeeds
                        }
                        res.json(response);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json(err);
                    });
            }
            // res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });

});
/**
 * Get job Details against ID
 */
router.get(`${API}job-detail/:id`, tokenMiddleware, function (req, res, next) {

    let job_id = req.params.id;
    locomJobs.jobDetail(job_id)
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
router.post(`${API}preferences`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
        start_date: queryParameters.start_date,
        end_date: queryParameters.end_date,
        // country: queryParameters.country,
        county: queryParameters.county,
        distance: queryParameters.distance,
        testing_time: queryParameters.testing_time,
        min_weekday_amount: queryParameters.min_weekday_amount,
        min_weekend_amount: queryParameters.min_weekend_amount,
    }
    locomJobs.setPreferences(jobPref)
        .then((jobFeeds) => {
            let response = {
                status: responseCode.OK,
                data: {
                    messages: jobFeeds,
                }
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get preferences 
 */
router.get(`${API}preferences`, tokenMiddleware, function (req, res, next) {

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
/**
 * Apply for job 
 */
router.post(`${API}apply`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
        job_id: queryParameters.job_id,
        store_id: queryParameters.store_id,
    }
    locomJobs.jobApply(jobPref)
        .then((jobFeeds) => {
            let response = {
                status: responseCode.OK,
                data: {
                    messages: "Applied for job Successfuly"
                }
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Reject Applied job 
 */
router.post(`${API}reject`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
        job_id: queryParameters.job_id,
        status: 3,
    }
    locomJobs.jobApply(jobPref)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get pending jobs for job 
 */
router.get(`${API}pending-jobs`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;

    let jobPref = {
        user_id: queryParameters.user_id,
    }
    locomJobs.jobPending(jobPref)
        .then((jobsList) => {
            let response = {
                "status": responseCode.OK,
                "data": jobsList,
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
/**
 * Get Booked/approved jobs for locom 
 */
router.get(`${API}booked-jobs`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;

    let jobPref = {
        user_id: queryParameters.user_id,
    }
    locomJobs.jobBooked(jobPref)
        .then((jobFeeds) => {
            console.log("booked jobs", jobFeeds);
            let response = {
                "status": responseCode.OK,
                "data": jobFeeds,
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Cancel job offer by locum
 */
router.delete(`${API}reject-jobs`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let jobPref = {
        user_id: queryParameters.user_id,
        job_id: queryParameters.job_id,
        store_id: queryParameters.store_id,
    }
    locomJobs.jobRejeted(jobPref)
        .then((jobFeeds) => {
            res.json(responseApi.response(responseCode.OK, jobFeeds));
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Get WorkHistory/Completed Jobs for locom 
 */
router.get(`${API}completed-jobs`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;

    let jobPref = {
        user_id: queryParameters.user_id,
        job_id: queryParameters.job_id,
    }
    locomJobs.jobCompleted(jobPref)
        .then((jobFeeds) => {
            let response = {
                "status": responseCode.OK,
                "data": jobFeeds
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * Cancel Job offer by locom 
 */
router.post(`${API}cancel-offer`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.body;

    let cancelOffer = {
        user_id: queryParameters.user_id,
        job_id: queryParameters.job_id,
        status: queryParameters.status,    //status= 3 for cancel requested  job offer
        description: queryParameters.description
    }
    locomJobs.jobOfferCancel(cancelOffer)
        .then((jobFeeds) => {
            let response = {
                status: responseCode.OK,
                data: {
                    messages: jobFeeds
                }
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

/**
 * user/locom payment history 
 */
router.get(`${API}payment-history`, tokenMiddleware, function (req, res, next) {

    let queryParameters = req.query;
    let user = {
        user_id: queryParameters.user_id,
    }
    locomJobs.getPaymentHistory(user)
        .then((jobData) => {
            let response={
                "status":responseCode.OK,
                "data":jobData
            }
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
module.exports = router;
