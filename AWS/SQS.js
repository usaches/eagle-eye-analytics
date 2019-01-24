const AWS = require('./config')

const sqs = new AWS.SQS

const jobDone = () => {
  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/421823961545/rekogdone',
  }
  sqs.receiveMessage(params,(err,data)=>{
    if(err) console.log(err)
    else console.log(data)
  })
}

module.exports = jobDone