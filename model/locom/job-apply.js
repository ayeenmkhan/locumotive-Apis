const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
var jobDetail =require('../locom/locom-jobs')
// var User =require('../account/user');
let applicant = Sqlconfig.define('job_applicants', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    job_id: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    store_id: Sequelize.INTEGER,
    description:Sequelize.TEXT,
    payment_status:Sequelize.INTEGER,
    cancellation_date:Sequelize.TEXT
}, {
    paranoid: false,
    timestamps: false
});
// applicant.hasOne(jobDetail, { foreignKey: 'job_id' });
module.exports = applicant;