let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let uuid = require('uuid');

exports.handler = function (event, context, callback) {

    let projectId = event.projectId || uuid.v4();

    ddb.put({
        TableName: 'SigmaUserProjects',
        Item: {
            'name': event.name,
            'username': event.username,
            'projectId': projectId,
            'description': event.description,
            'functions': event.functions
        }
    }, function (err, data) {
        callback(err, {
            projectId 
        });
    });
}