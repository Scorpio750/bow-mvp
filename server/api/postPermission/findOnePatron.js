const {User} = require('../../db')
const AWS = require('aws-sdk');
const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  //We need both a key and secret to access any endpoint
  accessKeyId: process.env.DO_SPACES_PUBLIC,
  secretAccessKey: process.env.DO_SPACES_SECRET
});

async function findOnePatron(uniqueId, artwork) {

  const currUser = await User.findByPk(uniqueId)
  let level = await currUser.privacyLevel()
  let userId = artwork.user.dataValues.id

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

  if((level === privacy) || (privacy === 4 && uniqueId === userId)) {
    // watch out for the unchanging Expires value in the url
    // this gets us a presigned URL for the private posts
    let result = s3.getSignedUrl('getObject', {Bucket: 'bodyofworkers', Key: `${fileName}`, Expires: 60})

    let path = result;
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
      privacy,
      year
    }

    return newFile
  }

  if(artwork.privacy === 1) {
    let site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/';

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
      year
    }
    return newFile;
  }
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
      year
    }
    return scrubbed
}

module.exports = findOnePatron;
