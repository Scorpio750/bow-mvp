const { User } = require('../../db');
const AWS = require('aws-sdk');
const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  //We need both a key and secret to access any endpoint
  accessKeyId: process.env.DO_SPACES_PUBLIC,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

async function findOnePatron(uniqueId, artwork) {
  artwork = artwork.get();
  const currUser = await User.findByPk(uniqueId);
  const level = await currUser.privacyLevel();
  const userId = artwork.user.dataValues.id;

  let { fileName, ...fields } = artwork;

  if (
    level === artwork.privacy ||
    (artwork.privacy === 4 && uniqueId === userId)
  ) {
    // this gets us a presigned URL for the private posts
    let result = s3.getSignedUrl('getObject', {
      Bucket: 'bodyofworkers',
      Key: `${fileName}`,
      Expires: 3600,
    });

    let path = result;
    let newFile = {
      fileName,
      path,
      ...fields,
    };

    return newFile;
  }

  if (artwork.privacy === 1) {
    const site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/';

    let path = `${site}${fileName}`;
    let newFile = {
      fileName,
      path,
      ...fields
    };
    return newFile;
  }
  let scrubbed = {
    ...fields
  };
  return scrubbed;
}

module.exports = findOnePatron;
