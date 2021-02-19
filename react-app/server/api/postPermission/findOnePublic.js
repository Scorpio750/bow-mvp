async function findOnePublic(artwork) {

  if(artwork.privacy === 1) return artwork;

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
    } = artwork;
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

module.exports = findOnePublic;
