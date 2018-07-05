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

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    cognitoidentityserviceprovider.getUser({AccessToken:"eyJraWQiOiJha1N5eVRLK05HZlV0OFMzYnVzNlNJV3d0VDlxVitsbHFDMzh6YnowTElVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiNTBhNWIwNi03ZWU5LTQwOTQtOWM3My1mOTc0MTFhYmZmNjgiLCJldmVudF9pZCI6ImUwNGQzNGFiLTdmNGYtMTFlOC04MmE2LTViNjk3ZmFiNWI2NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzA2ODQxNjcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX243Y0tON2wxdCIsImV4cCI6MTUzMDc2ODU2OSwiaWF0IjoxNTMwNzY0OTY5LCJqdGkiOiI1NjRiOTQ3OS01ZDIwLTQ3OGUtYjAyOC01NTJiYTE1OTZmNTQiLCJjbGllbnRfaWQiOiJqODQ4dWM0a3VqY2tjMmowdHRyMHRxajlvIiwidXNlcm5hbWUiOiJjd2lkYW5hZ2UifQ.MODbudESeRAZxGWy8YajBq6y5QsSs3Ew-tThH7XHkFAr75uANwrC6Qk1vvQBM4HX-t0Q_rneFJo77s6KqaDsaNo6Gd9BVD4OYsKB0-C09jGe_gsmSg-x5EZxCRe06djw8oTNq8xAinzHAsrAJ5MWu4_0kyfGTF-tCz5euESvg16ycQrXmAHwREy0Kj2jnHyh6fSf0C5VgFLSH3ZeC6ljgCZDaKrOfpc2OVQanlOh0vTDwVCfl3UwHkNpUxK1wa30jvS-A7hH8mVZnEm7287GO8k_MuQqvU6Vs0GTGypSs_0v12GI8SRIITUTZoFIUXfkB6NU9D3v1GP1zya-1hVQ4w"}, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

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