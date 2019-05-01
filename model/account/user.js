const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
let applicant=require('../../model/locom/job-apply')
let review=require('../../model/account/user-review')
let User = Sqlconfig.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        unique:true,
        require: true
    },
    password: Sequelize.TEXT,
    phone_no: Sequelize.TEXT,
    tc_box: Sequelize.TEXT,
    user_type: Sequelize.TEXT,
    verification_code: Sequelize.TEXT,
    is_verified: Sequelize.INTEGER,
    fcm_token:Sequelize.TEXT,
    profile_review:Sequelize.INTEGER
}, {
    paranoid: false,
    timestamps: false
});
User.hasOne(applicant, { foreignKey: 'user_id' });
review.belongsTo(review, { foreignKey: 'review_id' });
module.exports = User;