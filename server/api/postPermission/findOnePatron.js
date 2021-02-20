const {User} = require('../../db')

async function findOnePatron(uniqueId, artwork) {

  const currUser = await User.findByPk(uniqueId)
  let level = await currUser.privacyLevel()
  let userId = artwork.user.dataValues.id


  if(artwork.privacy === 4 && uniqueId === userId) return artwork
  if(level === artwork.privacy) return artwork

  if(artwork.privacy === 1) return artwork;
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
    } = artwork;
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

module.exports = findOnePatron;
