const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');

let notifications = Sqlconfig.define('notifications', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.TEXT,
    message: Sequelize.TEXT,
    type: Sequelize.STRING,
    reciepents: Sequelize.TEXT,
    job_id: Sequelize.INTEGER,
    store_id: Sequelize.INTEGER,
}, {
    paranoid: false,
    timestamps: false
});
// applicant.belongsTo(Job, { foreignKey: 'job_id'});


module.exports = notifications;