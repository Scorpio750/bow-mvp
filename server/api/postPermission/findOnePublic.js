async function findOnePublic(artwork) {
  let site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/'

  if(artwork.privacy === 1 && artwork.fileType === 'Image' ) {
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
      privacy,
      year
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
      tags,
      privacy,
      year
    }
    return scrubbed
  };

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
      privacy,
      year
    } = artwork;
    let path = undefined

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
      tags,
      privacy,
      year
    }
    return scrubbed
}

module.exports = findOnePublic;
