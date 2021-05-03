async function findAllPublic(artwork) {
  const post = artwork.map((currPost) => {
    // Using .get() to only get the instance fields without the extras from sequelize
    currPost = currPost.get();

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
    } else {
      let { fileName, ...fields } = currPost;
      let scrubbed = {
        path: undefined,
        ...fields,
      };
      return scrubbed;
    }
  });
  return post;
}

module.exports = findAllPublic;
