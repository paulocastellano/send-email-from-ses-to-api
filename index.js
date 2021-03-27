const got = require('got');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

let s3bucket = 'my-s3-bucket';
let apiEndpoint = 'my-api-endpoint';


exports.handler = async (event, context, callback) => {

    var requestData = {
        event: event.Records[0],
        body: null
    };

    let { Body } = await s3.getObject({
        Bucket: `${s3bucket}`,
        Key: requestData.event.ses.mail.messageId
    }).promise();

    requestData.body = Body.toString('utf8');

    await got.post(`${apiEndpoint}`, {
        json: requestData,
        responseType: 'json'
    });
};