let AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {

	console.log(event);



	callback(null, {
		"isBase64Encoded": 1,
		"statusCode": 200,
		"headers": {
			"headerName": "headerValue"
		},
		"body": "..."
	});
}