const {User} = require('../../db')

async function findAllPatron(id, artwork) {

  const currUser = await User.findByPk(id)
  let level = await currUser.privacyLevel()

  const post = artwork.map((currPost) => {
    let userId = currPost.user.dataValues.id

    if(currPost.privacy === 4 && id === userId) return currPost

    if(level === currPost.privacy) return currPost

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
        tags
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
        tags
      }
      return scrubbed
    }
  })
  return post
}

module.exports = findAllPatron
