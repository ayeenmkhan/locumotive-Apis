const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
// var userDetail =require('../../model/account/user');
let skills = Sqlconfig.define('locom_skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    skill_name: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});
// userDetail.hasOne(User, { foreignKey: 'user_id' });

module.exports = skills;