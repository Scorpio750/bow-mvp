async function findOnePublic(artwork) {

  if(artwork.privacy === 1 && artwork.fileType === 'Image' ) return artwork;
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
    } = artwork;
    let path = `${site}${fileName}`

    let scrubbed = {
      id,
      title,
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
    return scrubbed
}

module.exports = findOnePublic;
