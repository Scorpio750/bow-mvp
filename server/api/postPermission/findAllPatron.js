require('dotenv').config();
const { User } = require('../../db');

// the config needed to make the aws code at the bottom work
const AWS = require('aws-sdk');
const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  //We need both a key and secret to access any endpoint
  accessKeyId: process.env.DO_SPACES_PUBLIC,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

async function findAllPatron(id, artwork) {
  try {

    const currUser = await User.findByPk(id);
    const level = await currUser.privacyLevel();

    const post = artwork.map( currPost => {
      // Using .get() to only get the instance fields without the extras from sequelize
      currPost = currPost.get();
      const userId = currPost.user.dataValues.id;

      // here we grab the public posts first
      if (currPost.privacy === 1) {
        let site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/';

        let { fileName, ...fields } = currPost;
        let path = `${site}${fileName}`;
        let newFile = {
          fileName,
          path,
          ...fields,
        };

        return newFile;
      }

      // Next we send the posts available to us if we are at the correct privacy level or if it belongs to us
      if (
        level === currPost.privacy ||
        (currPost.privacy === 4 && id === userId)
      ) {
        let { fileName, ...fields } = currPost;

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
        // otherwise, the post is not at your pricacy level, so return a blank post
      } else {
        let { fileName, ...fields } = currPost;
        let scrubbed = {
          ...fields,
        };
        return scrubbed;
      }
    });
    return post;
  } catch (error) {
    console.log(error);
  }
}

module.exports = findAllPatron;
