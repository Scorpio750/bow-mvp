async function findOnePublic(artwork) {
  artwork = artwork.get();

  const site = 'https://bodyofworkers.nyc3.digitaloceanspaces.com/';

  if (artwork.privacy === 1) {
    let { fileName, ...fields } = artwork;
    let path = `${site}${fileName}`;

    let scrubbed = {
      path,
      ...fields,
    };
    return scrubbed;
  }

  let { fileName, ...fields } = artwork;
  let path = undefined;

  let scrubbed = {
    path,
    ...fields,
  };
  return scrubbed;
}

module.exports = findOnePublic;
