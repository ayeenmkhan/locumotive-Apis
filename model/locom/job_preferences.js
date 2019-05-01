const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');

let User = Sqlconfig.define('job_preferences', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    country: Sequelize.TEXT,
    county: Sequelize.TEXT,
    distance: Sequelize.TEXT,
    testing_time: Sequelize.TEXT,
    min_weekday_amount: Sequelize.TEXT,
    min_weekend_amount: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});

module.exports = User;