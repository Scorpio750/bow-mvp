/**
 * Kade: Adding helper functions for sorting here
 */

 export const alphaSort =  (x, y) => {
  let a = x.title.toUpperCase(),
      b = y.title.toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}

export const reverseAlphaSort =  (x, y) => {
  let a = x.title.toUpperCase(),
      b = y.title.toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}

export const newestYearSort =  (x, y) => {
  let a = Number(x.year),
      b = Number(y.year);
  return a === b ? 0 : b > a ? 1 : -1;
}

export const oldestYearSort =  (x, y) => {
  let a = Number(x.year),
      b = Number(y.year);
  return a === b ? 0 : a > b ? 1 : -1;
}

export const artistSort =  (x, y) => {
  let a = x.user.publicName.toUpperCase(),
      b = y.user.publicName.toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}

export const reverseArtistSort =  (x, y) => {
  let a = x.user.publicName.toUpperCase(),
      b = y.user.publicName.toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}
