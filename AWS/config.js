const AWS = require('aws-sdk')

AWS.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1'
})

module.exports = AWS