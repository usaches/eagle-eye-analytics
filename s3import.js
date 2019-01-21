const axios = require('axios')
const Path = require('path')
const fs = require('fs')
var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

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