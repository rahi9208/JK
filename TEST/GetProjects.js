let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    let response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": "..."
    };

    let username = event.queryStringParameters.username;

    ddb.query({
        TableName: 'SigmaProjects',
        ExpressionAttributeValues: { ':username': username },
        KeyConditionExpression: 'id = :username',
    }, function (err, data) {
        if (!err) {
            response.body = JSON.stringify(data.Items);
        }
        callback(err, response);
    });


}