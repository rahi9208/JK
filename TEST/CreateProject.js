let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    ddb.put({
        TableName: 'SigmaProjects',
        Item: {
            'name': event.name,
            'id': event.username,
            'description': event.description,
            'functions':event.functions
        }
    }, function (err, data) {
        callback(err, 'Successfully executed');
    });
}