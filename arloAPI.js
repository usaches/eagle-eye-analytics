require('dotenv').config()
const axios = require('axios');

const API = {
  signIn: () => {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'post',
        url: 'https://arlo.netgear.com/hmsweb/login/v2',
        data: {
          email: process.env.EMAIL,
          password: process.env.PASS
        }
      })
        .then(res => {
          resolve(res.data.data.token)
        })
        .catch(err => {
          reject(err.response)
        })
    })
  },
  getVideoClip: (token) => {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'post',
        url: 'https://arlo.netgear.com/hmsweb/users/library',
        headers: {
          Authorization: token
        },
        data: {
          dateFrom: "20190118",
          dateTo: "20190118"
        }
  
      })
      .then(res=>{
        const img = res.data.data.map(d=>{
          return(d.presignedContentUrl)
        })
        resolve(img)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getDevices: (token) => {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'get',
        url: 'https://arlo.netgear.com/hmsweb/users/devices',
        headers: {
          Authorization: token
        },
      })
      .then(res=>{
        resolve(res.data.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
}

module.exports = API