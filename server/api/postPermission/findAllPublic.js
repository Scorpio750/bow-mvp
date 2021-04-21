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
        tags,
        privacy

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
        tags,
        privacy

      }

      return newFile

    }

    else {
      let {
        id,
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
        tags,
        privacy

      } = currPost;
      let scrubbed = {
        id,
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
        tags,
        path: undefined,
        privacy

      }
      return scrubbed
    }
  })
  return post
}

module.exports = findAllPublic
