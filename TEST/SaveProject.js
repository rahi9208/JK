let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let uuid = require('uuid');

exports.handler = function (event, context, callback) {

    let createdTime = event.createdTime || new Date().getTime();
    let updatedTime = new Date().getTime();
    let projectId = event.projectId || (createdTime + "-" + uuid.v4());

    ddb.put({
        TableName: 'SigmaUserProjects',
        Item: {
            'name': event.name,
            'username': event.username,
            projectId,
            'description': event.description,
            'functions': event.functions,
            createdTime,
            updatedTime
        }
    }, function (err, data) {
        callback(err, {
            projectId
        });
    });
}