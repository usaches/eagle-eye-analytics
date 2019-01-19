const axios = require('axios')
const Path = require('path')
const fs = require('fs')


async function importToS3(url, num){
    const path = Path.resolve(__dirname,'files',`video${num}.mp4`)

    const response = await axios({
        method:'get',
        url,
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(path))
}

module.exports = importToS3