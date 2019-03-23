const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
var userDetail =require('../../model/account/user');
let User = Sqlconfig.define('locom_profiles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    date_of_birth: Sequelize.TEXT,
    address: Sequelize.TEXT,
    goc_number: Sequelize.TEXT,
    opl_number: Sequelize.TEXT,
    insurance_company: Sequelize.TEXT,
    insurance_no: Sequelize.TEXT,
    profile_photo: Sequelize.TEXT,
    equipment_preferred: Sequelize.TEXT,
    skills: Sequelize.TEXT,
    year_of_experience: Sequelize.TEXT,
    preferred_testing_time: Sequelize.TEXT,
}, {
    paranoid: false,
    timestamps: false
});
userDetail.hasOne(User, { foreignKey: 'user_id' });

module.exports = User;