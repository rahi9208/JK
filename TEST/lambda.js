let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let uuid = require('uuid');

exports.handler = function (event, context, callback) {

    let id = uuid.v4();

    ddb.put({
        TableName: 'SigmaProjects',
        Item: {
            'name': event.name,
            'id': id,
            'description': event.description,
            'functions':event.functions
        }
    }, function (err, data) {
        callback(err, 'Successfully executed');
    });
}