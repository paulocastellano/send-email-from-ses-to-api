const got = require('got');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();


exports.handler = async (event, context, callback) => {

    var requestData = {
        event: event.Records[0],
        body: null
    };


    let { Body } = await s3.getObject({
        Bucket: 'inbox.webhook.live',
        Key: requestData.event.ses.mail.messageId
    }).promise();



    // Custom email processing goes here
    requestData.body = Body.toString('utf8'); // precisa ser misculo

    await got.post('https://webhook.live/5f972dfb-53d2-46ea-aed6-a4dac649d2be', {
        json: requestData,
        responseType: 'json'
    });
};