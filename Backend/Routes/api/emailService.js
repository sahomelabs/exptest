// emailService.js
const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, EMAIL_FROM } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const sendEmail = async (to, subject, text) => {
  const params = {
    Source: EMAIL_FROM,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: text,
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
