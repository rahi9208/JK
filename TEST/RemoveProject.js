let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    let username = event.queryStringParameters.username;
    let projectId = event.queryStringParameters.projectId;
    ddb.delete({
        TableName: 'SigmaUserProjects',
        Key: { 'username': username, 'projectId': projectId }
    }, function (err, data) {
        if (err) {
            //handle error
        } else {
            //your logic goes here
        }
    });

    callback(null, 'Successfully executed');
}