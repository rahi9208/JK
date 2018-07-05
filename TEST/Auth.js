const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
exports.wrap = function (event, callback, logic) {
    let response = {
        "statusCode": 401,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": ""
    };

    cognitoidentityserviceprovider.getUser({ AccessToken: (event.headers && event.headers.Authorization) || event.Authorization }, function (err, data) {
        if (err) {
            console.error("Error in authenticating user");
            callback(response, response);
        } else {
            logic(data.Username);
        }
    });
}