const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
let store =require('../../model/account/store-profile');

let Job = Sqlconfig.define('locom_jobs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    job_title: Sequelize.TEXT,
    job_id: Sequelize.TEXT,
    country: Sequelize.TEXT,
    city: Sequelize.TEXT,
    distance: Sequelize.TEXT,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    perday_amount: Sequelize.TEXT,
    start_time: Sequelize.TEXT,
    end_time: Sequelize.TEXT,
    min_weekday_amount: Sequelize.TEXT,
    min_weekend_amount: Sequelize.TEXT,
    testing_time: Sequelize.TEXT,
    job_detail: Sequelize.TEXT,
    payment_status: Sequelize.TEXT,
    skills: Sequelize.TEXT,
    address: Sequelize.TEXT,
    parking: Sequelize.INTEGER,
    pre_test: Sequelize.INTEGER,
    field_test: Sequelize.INTEGER,
    phorotoper: Sequelize.INTEGER,
    trail_frame: Sequelize.INTEGER,
    store_id: Sequelize.INTEGER,
    intrested: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});
// Job.belongsTo(store, { foreignKey: 'id',targetKey:'id' });


module.exports = Job;