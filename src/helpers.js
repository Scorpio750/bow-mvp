import { get } from 'lodash';
/**
 * Kade: Adding helper functions for sorting here
 */

export const alphaSort = (x, y) => {
  const a = String(get(x, 'title')).toUpperCase(),
        b = String(get(y, 'title')).toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}

export const reverseAlphaSort = (x, y) => {
  const a = String(get(x, 'title')).toUpperCase(),
        b = String(get(y, 'title')).toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}

export const newestYearSort = (x, y) => {
  const a = Number(get(x, 'year')),
        b = Number(get(y, 'year'));
  return a === b ? 0 : b > a ? 1 : -1;
}

export const oldestYearSort = (x, y) => {
  const a = Number(get(x, 'year')),
        b = Number(get(y, 'year'));
  return a === b ? 0 : a > b ? 1 : -1;
}

export const artistSort = (x, y) => {
  const a = String(get(x, 'user.publicName')).toUpperCase(),
        b = String(get(y, 'user.publicName')).toUpperCase();
  return a === b ? 0 : a > b ? 1 : -1;
}

export const reverseArtistSort = (x, y) => {
  const a = String(get(x, 'user.publicName')).toUpperCase(),
        b = String(get(y, 'user.publicName')).toUpperCase();
  return a === b ? 0 : b > a ? 1 : -1;
}
