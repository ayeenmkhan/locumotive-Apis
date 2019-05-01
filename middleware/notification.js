// var fcm = require('fcm-notification');
var admin = require('firebase-admin');
// var FCM = new fcm('middleware/serviceAccountKey.json');
var serviceAccount  = require('../middleware/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://locumotive-b5898.firebaseio.com'
  });
var fcmUserModel = require('../model/account/user');
var fcmStoreModel = require('../model/account/store-profile');
function sendNotification(message, tokens) {

var tokenn ="eKjYhLetZ5A:APA91bFSqQJLI0pdn-Oi6ayqB2YoPmsE6FJhX-mUx2ebcsf6masRA-hG6YDWAzEsLhe1w1LumCSqmXTSTbpUfBNTayLOZ3U8YMsLLS-9al0gN6GlZh48hHuURhYRxTOZe8oRTDRC641v"

admin.messaging().sendToDevice(tokenn, message)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    let res= JSON.stringify(response);
    console.log('Successfully sent message:', res);
  })
  .catch(function(error) {
    console.log('Error sending message:', error);
  });
    // var response;
    // FCM.sendToMultipleToken(message, tokens, function (err, resp) {
        
    //     if (err) {
    //         console.log('err--', err);
    //     } else {
    //         console.log('Notification response-----', resp);
    //         response = resp
    //     }
    

    // })
    // // FCM END
    // return response
}

let getTokens = (user_id) => {
    return new Promise((resolve, reject) => {
        fcmUserModel.findOne({
                    where: {
                        user_id: user_id
                    },
                    // logging:true
                    raw: true,
                })
                .then((token) => {
                    resolve(token);
                })
                .catch((err) => {
                    reject(err)
                });
        

    })
}
let getStoreTokens = (id) => {
  return new Promise((resolve, reject) => {
    fcmStoreModel.findOne({
                  where: {
                      id: id
                  },
                  // logging:true
                  raw: true,
              })
              .then((token) => {
                  resolve(token);
              })
              .catch((err) => {
                  reject(err)
              });
      

  })
}

module.exports = {
    sendNotification,
    getTokens,
    getStoreTokens
};