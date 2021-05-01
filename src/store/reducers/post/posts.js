import {
  reverseAlphaSort,
  newestYearSort,
  oldestYearSort,
  alphaSort,
  artistSort,
  reverseArtistSort,
} from '../../../helpers';
import {
  GET_ALL_POSTS,
  ADD_POST,
  REMOVE_POST,
  GET_ARTIST_POSTS,
  defaultFeedPosts,
  defaultArtistPosts,
  SORT_REVERSE_ALPHA,
  SORT_OLDEST,
  SORT_NEWEST,
  SORT_ALPHA,
  SORT_ARTIST,
  SORT_REVERSE_ARTIST,
} from '../../actions/posts';

export const feedPosts = (state = defaultFeedPosts, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.artworks;
    //TODO filter logic
    case ADD_POST:
      return [...state, action.artwork];
    case REMOVE_POST:
      return defaultFeedPosts;
    case SORT_ALPHA:
      return [...state].sort(alphaSort);
    case SORT_REVERSE_ALPHA:
      return [...state].sort(reverseAlphaSort);
    case SORT_NEWEST:
      return [...state].sort(newestYearSort);
    case SORT_OLDEST:
      return [...state].sort(oldestYearSort);
    case SORT_ARTIST:
      return [...state].sort(artistSort);
    case SORT_REVERSE_ARTIST:
      return [...state].sort(reverseArtistSort);
    default:
      return state;
  }
};

export const artistPosts = (state = defaultArtistPosts, action) => {
  switch (action.type) {
    case GET_ARTIST_POSTS:
      return action.artworks;
    //TODO filter logic
    default:
      return state;
  }
};
