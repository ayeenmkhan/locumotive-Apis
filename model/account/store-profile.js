const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
let jobs =require('../../model/locom/locom-jobs');
let Store = Sqlconfig.define('store_profiles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    store_name: Sequelize.TEXT,
    address: Sequelize.TEXT,
    weekend_rate: Sequelize.TEXT,
    equipment: Sequelize.TEXT,
    parking_available: Sequelize.TEXT,
    pre_test_required: Sequelize.TEXT,
    field_test: Sequelize.STRING,
    phoropter: Sequelize.STRING,
    trail_frame: Sequelize.STRING,
    contact_lens: Sequelize.STRING,
    weekday_rate: Sequelize.STRING,
    profile_picture:Sequelize.TEXT,
    detail: Sequelize.TEXT,
    latitude: Sequelize.TEXT,
    longitude: Sequelize.TEXT,
    preferred_testing_time: Sequelize.TEXT,
    total_jobs_posted:Sequelize.INTEGER,
    fcm_token: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});
jobs.belongsTo(Store, { foreignKey: 'store_id'});
module.exports = Store;