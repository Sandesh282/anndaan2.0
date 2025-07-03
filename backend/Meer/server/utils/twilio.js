const twilio = require('twilio');

const accountSid = 'yAC56cecb2a22f8f957ba1201f1b9bb3d86our_account_sid';
const authToken = 'c70e28b659daea09a84fa3145962ce44';
const verifySid = 'VAafb66aebe84cb4d9d2dfe0bbb882ee8d';

const client = twilio(accountSid, authToken);

module.exports = client;
