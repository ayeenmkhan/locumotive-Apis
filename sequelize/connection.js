var configuration = require('../sequelize/config');
var responseCode = require('../response/response-codes');
var responseMessage = require('../response/response-messages');
var responseApi = require('../response/api-response');
function authDbCon() {

    const sequelize = configuration;
    sequelize
        .authenticate()
        .then((success) => {
            console.log(success);
            console.log('Connection Eastablished')
        })
        .catch(err => {
            console.log(err);
            console.log(responseApi.response(responseCode.DB_CONNECTION_ERROR,responseMessage.DB_CONNECTION))
        });

}

module.exports = authDbCon;