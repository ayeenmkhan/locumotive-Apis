const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
var jobDetail =require('../locom/locom-jobs')
let User = Sqlconfig.define('job_applicants', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    job_id: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    description:Sequelize.TEXT,
    payment_status:Sequelize.INTEGER
}, {
    paranoid: false,
    timestamps: false
});
User.hasOne(jobDetail, { foreignKey: 'job_id' });
module.exports = User;