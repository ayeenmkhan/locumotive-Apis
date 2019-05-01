const Sequelize = require('sequelize');
const Sqlconfig = require('../../sequelize/config');
const user = require('../account/user');
let review = Sqlconfig.define('locom_reviews', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    review_id: Sequelize.INTEGER,
    name: Sequelize.TEXT,
    review_description: Sequelize.TEXT,
    review_stars: Sequelize.TEXT,
    conversion_stars:Sequelize.TEXT,
    punctuality_stars:Sequelize.TEXT,
    customer_service_stars:Sequelize.TEXT,
    job_id:Sequelize.INTEGER
}, {
    paranoid: false,
    timestamps: false
});
// user.hasMany(review, { foreignKey: 'user_id' });
module.exports = review;