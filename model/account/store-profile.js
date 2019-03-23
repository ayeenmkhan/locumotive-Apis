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
    detail: Sequelize.TEXT,
    latitude: Sequelize.TEXT,
    longitude: Sequelize.TEXT,
    preferred_testing_time: Sequelize.TEXT,
    total_jobs_posted:Sequelize.INTEGER,
}, {
    paranoid: false,
    timestamps: false
});
// Store.hasMany(jobs, { foreignKey: 'store_id',targetKey: 'store_id' });
module.exports = Store;