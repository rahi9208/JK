var AWSXRay = require('aws-xray-sdk');
var oldRequire = require;
/*
* todo check env before wrapping. if process.env.trace is set, then wrap require, else just return
*/
require = function (lib) {
	console.log("Requiring lib", lib);
	switch (lib) {
		case "aws-sdk":
			return AWSXRay.captureAWS(oldRequire(lib));
		case "aws-xray-sdk":
			return AWSXRay;
		case "mysql":
			return AWSXRay.captureMySQL(oldRequire('mysql'));
		case "pg":
			return AWSXRay.capturePostgres(oldRequire('pg'));
	}
	return oldRequire(lib);
}

var AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let axios = require('axios');
exports.handler = function (event, context, callback) {
	var functionLifeCycle = AWSXRay.getSegment().addNewSubsegment("FunctionLifeCycle");
	functionLifeCycle.addMetadata("event", event);
	functionLifeCycle.addMetadata("context", context);
	handle(event, context, (err, data) => {
		functionLifeCycle.addMetadata("response", data);
		functionLifeCycle.close(err, false);
		callback(err, data);
	});
}

function handle(event, context, callback) {

	axios.get("https://google.com").then((response) => {
		ddb.get({
			TableName: 'BTMenu',
			Key: { 'itemCode': 'TOMS' }
		}, function (err, data) {
			console.log("Data", data);
			callback(err, data);
		});
	}).catch(err => {
		console.error(err);
	});
}