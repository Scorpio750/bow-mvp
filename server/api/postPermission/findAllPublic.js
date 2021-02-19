
async function findAllPublic(artwork) {


  const post = artwork.map((currPost) => {


    if(currPost.privacy === 1) return currPost

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
