require('dotenv').config();
const AWS = require('aws-sdk');
//if we app a router, this is mounted on /api/do

//This configuration allows us to reach the required endpoint. nyc3 is our Region
const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  //We need both a key and secret to access any endpoint
  accessKeyId: process.env.DO_SPACES_PUBLIC,
  secretAccessKey: process.env.DO_SPACES_SECRET
});


const params = {
  //The Bucket key points to the DO Space that we are using called bodyofworkers
  Bucket: "bodyofworkers",
  //The Key refers to the title of the file/object that we wat to access. Let's think about how to use the Key dynamically
  Key: "Domina_Mara_IMG_4036-sm.png"
};

//fetches a single Object based on the params passed it.
s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {

      console.log(data)
      //the buffer object lives here: data.Body
      // console.log(data.Body)
  };
});
