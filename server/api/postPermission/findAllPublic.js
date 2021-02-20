const {params, s3 } = require('./digitalOcean')
async function findAllPublic(artwork) {
  const post = artwork.map((currPost) => {


    if(currPost.privacy === 1 && currPost.fileType === 'Image' ) {
      let site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/'

      let {
        id,
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
      let path = `${site}${fileName}`
      let newFile = {
        id,
        title,
        fileName,
        path,
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
