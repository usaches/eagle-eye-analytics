const AWS = require('./config')
const jobDone = require('./SQS')
const rekognition = new AWS.Rekognition()

const faceDetect = (num) => {
  const params = {
    Video: {
      S3Object: {
        Bucket: 'engleeyebucket',
        Name: `video${num}.mp4`,
      }
    },
    NotificationChannel: {
      RoleArn: 'arn:aws:iam::421823961545:role/RekognitionServiceRole',
      SNSTopicArn: 'arn:aws:sns:us-east-1:421823961545:reKog_done'
    }
  }
  rekognition.startPersonTracking(params, (err, jobId) => {
    if (err) throw (err)
    else rekognition.getPersonTracking(jobId, (err,data)=>{
      if(err) throw(err)
      else console.log(data)
    }) 
  })
}

module.exports = faceDetect