const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');

let adminUser = Sqlconfig.define('admin_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.TEXT,
    password: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});

module.exports = adminUser;