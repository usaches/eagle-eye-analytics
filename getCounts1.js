var request = require("request");
var arr=[];
request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function(error, response, body) {

        if (!error && response.statusCode === 200) {


            for (var i=0; i<JSON.parse(body).Faces.length; i++){
                // console.log(JSON.parse(body).Faces[i].ImageId);
                arr.push(JSON.parse(body).Faces[i].ImageId);
            }
            // console.log(arr);
            var counts = {};
            arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            console.log("People in each photo:");
            console.log(counts)
            // var unique = [...new Set(arr)];
            // console.log(unique);
            // for (var j=0; j<arr.length; j++){
            //   unique.forEach(function(count){
            //
            //   })
        }
    }
);
