const axios = require('axios')
const stream = require('stream')
const AWS = require('./config')

const s3 = new AWS.S3()
//stream data starting
function uploadFromStream(s3, num) {
  var pass = new stream.PassThrough();
  var params = { Bucket: 'engleeyebucket', Key: `video${num}.mp4`, Body: pass };
  s3.upload(params, (err, data) => {
    if (err) throw new Error('oops something went wrong!')
    else console.log(data);
  });

  return pass;
}

function importToS3(url, num) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'stream'
    })
    .then(response=>{
      response.data.pipe(uploadFromStream(s3, num))
      resolve('done')
    })
  })
}

module.exports = importToS3