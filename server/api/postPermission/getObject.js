export const res = s3.getObject(params, function (err, data) {
  if(err) console.log(err, err.stack);
  else {
    //this is the data we must put somewhere.
    console.log(data.ContentType, data.Body)

  }
})

module.exports res;
