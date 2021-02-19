const {params, s3 } = require('./digitalOcean')
async function findAllPublic(artwork) {


  const post = artwork.map((currPost) => {


    if(currPost.privacy === 1) {
      let {
        title,
        sequence,
        fileName,
        caption,
        instagram,
        twitter,
        microBio,
        location,
        geo,
        user,
        medium,
        materials,
        dimensions,
        genre,
        languages,
        references,
        credits,
        distributor,
        pressLink,
        tags
      } = currPost;
      let newFile = {
        title,
        fileName,
        //file
        sequence,
        caption,
        instagram,
        twitter,
        microBio,
        location,
        geo,
        user,
        medium,
        materials,
        dimensions,
        genre,
        languages,
        references,
        credits,
        distributor,
        pressLink,
        tags
      }

      params.Key = fileName

      const res = s3.getObject(params, function (err, data) {
        if(err) console.log(err, err.stack);
        else {
          //this is the data we must put somewhere.
          console.log(data.ContentType, data.Body)

        }
      })

      console.log(res)

      return newFile

    }

    else {
      let {
        title,
        sequence,
        caption,
        instagram,
        twitter,
        microBio,
        location,
        geo,
        user,
        medium,
        materials,
        dimensions,
        genre,
        languages,
        references,
        credits,
        distributor,
        pressLink,
        tags
      } = currPost;
      let scrubbed = {
        title,
        sequence,
        caption,
        instagram,
        twitter,
        microBio,
        location,
        geo,
        user,
        medium,
        materials,
        dimensions,
        genre,
        languages,
        references,
        credits,
        distributor,
        pressLink,
        tags
      }
      return scrubbed
    }
  })
  return post
}

module.exports = findAllPublic
