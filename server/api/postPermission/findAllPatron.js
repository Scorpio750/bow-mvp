require('dotenv').config()
const {User} = require('../../db')
const { params } = require('./digitalOcean')
// the config needed to make the aws code at the bottom work
const AWS = require('aws-sdk');
const artistEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: artistEndpoint,
  //We need both a key and secret to access any endpoint
  accessKeyId: process.env.DO_SPACES_PUBLIC,
  secretAccessKey: process.env.DO_SPACES_SECRET
});

async function findAllPatron(id, artwork) {
  try {

  const currUser = await User.findByPk(id)
  let level = await currUser.privacyLevel()
  // if I add async inside of the callback of map for the s3 function at the bottom, this breaks the request
  const post = artwork.map( (currPost) => {
    if(currPost.fileType !== 'Image') {
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
        privacy

      }
      return scrubbed
    }
    let userId = currPost.user.dataValues.id
    // here we grab the public posts first

    if(currPost.privacy === 1) {
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
    // lastly we send the posts available to us if we are at the correct privacy level or if it belongs to us
    if((level === currPost.privacy) || (currPost.privacy === 4 && id === userId)) {
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
      // watch out for the unchanging Expires value in the url
      // this gets us a presigned URL for the private posts
      let result = s3.getSignedUrl('getObject', {Bucket: 'bodyofworkers', Key: `${fileName}`, Expires: 3600})
      if(title === 'Grapejob') console.log(result)
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
        privacy

      }
      return scrubbed
    }
  })
  return post
} catch (error) {
  console.log(error)
}
}

module.exports = findAllPatron

// https://bodyofworkers.nyc3.digitaloceanspaces.com/Juniper_Juicy_GrapeJob.mp4?AWSAccessKeyId=QV227UWZUCCPCVI4GU44&Expires=1619041830&Signature=lXijoVJVMZSo%2BaibDViBlTke%2Boo%3D

// https://bodyofworkers.nyc3.digitaloceanspaces.com/Juniper_Juicy_GrapeJob.mp4?AWSAccessKeyId=QV227UWZUCCPCVI4GU44&Expires=1619045578&Signature=YQWJ9QH23sLPSZesWWunjQqXMvs%3D
