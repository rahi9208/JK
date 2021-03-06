let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let Auth = require('../Auth');

exports.handler = function (event, context, callback) {
    Auth.wrap(event, callback, (username) => {
        
        let response = {
            "isBase64Encoded": 1,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": ""
        };

        let widget = JSON.parse(event.body);

        let createdTime = project.createdTime || new Date().getTime();
        let updatedTime = new Date().getTime();
        let widgetId = widget.widgetId || (createdTime + "-" + uuid.v4());

        ddb.put({
            TableName: 'DashboardWidgets',
            Item: {
                username,
                widgetId,
                widgetType:widget.Type,
                data:widget.data
            }
        }, function (err, data) {
            if(!err){
                console.log("Successfully saved widget of %s with id %s", username, widgetId);
                response.body = response.body = JSON.stringify({
                    projectId
                });
            }else{
                console.error("Error in saving widget of", username, err);
                response.statusCode = 500;
                response.body = err.message;
            }
            callback(null, response);
        });
    });
    
}