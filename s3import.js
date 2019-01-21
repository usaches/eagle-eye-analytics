const axios = require('axios')
const AWS = require('aws-sdk')
const stream = require('stream')

AWS.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1'
})

const s3 = new AWS.S3()

function uploadFromStream(s3,num) {
  var pass = new stream.PassThrough();
  var params = {Bucket: 'engleeyebucket', Key: `video${num}.mp4`, Body: pass};
  s3.upload(params, (err, data)=> {
    if(err) throw new Error('oops something went wrong!')
    else console.log(data);
  });

  return pass;
}

async function importToS3(url, num){

    const response = await axios({
        method:'get',
        url,
        responseType: 'stream'
    })

    response.data.pipe(uploadFromStream(s3,num))
}

module.exports = importToS3