require('dotenv').config();
const AWS = require('aws-sdk');
const router = require('../auth');

const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  accessKeyId: process.env.DIGITAL_OCEANS_PUBLIC_KEY,
  secretAccessKey: process.env.DIGITAL_OCEANS_SECRET
});


const params = {
  Bucket: "bodyofworkers",
  Key: "Ze_Royale_Daymares_3.JPG"
};
let test = []
s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
      // data['Contents'].forEach(function(obj) {
      //     console.log(obj);
      // })
      console.log(data)
      // console.log(data.Body)
      test.push(data.Body)
  };
});
