const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const API = require('./arloAPI')
const importToS3 = require('./AWS/s3import')
const faceDetect = require('./AWS/rekognition')

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//getting data from AWS
app.get('/data', (req, resp) => {
  API.signIn()
  .then(res=>{
    API.getVideoClip(res)
    .then(imgURL=>{
      imgURL.forEach((url,i)=>{
        if(i<=3){
          importToS3(url, i+1)
          .then(res=>{
            if(res === 'done'){
              faceDetect(i+1)
            }
          })
        }
      })
      resp.send(imgURL)
    })
  })
})
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//server up and running

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
