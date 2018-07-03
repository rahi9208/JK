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

    console.log("Searching for", username);

    ddb.query({
        TableName: 'SigmaUserProjects',
        ExpressionAttributeValues: { ':username': username },
        KeyConditionExpression: 'username = :username',
    }, function (err, data) {
        if (!err) {
            console.log("Successfully queried", data.Items.length, "for", username);
            response.body = JSON.stringify(data.Items);
        } else {
            console.error("Error occurred when searching for projects of", username, err);
        }
        callback(err, response);
    });
}