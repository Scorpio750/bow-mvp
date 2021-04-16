import {
  GET_ALL_POSTS,
  ADD_POST,
  REMOVE_POST,
  GET_ARTIST_POSTS,
  defaultFeedPosts,
  defaultArtistPosts,
} from '../../actions/posts'


export const feedPosts = (state = defaultFeedPosts, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.artworks
    //TODO filter logic
    case ADD_POST:
      return [...state, action.artwork]
    case REMOVE_POST:
      return defaultFeedPosts
    default:
      return state
  }
}

export const artistPosts = (state = defaultArtistPosts, action) => {
  switch (action.type) {
    case GET_ARTIST_POSTS:
      return action.artworks
    //TODO filter logic
    default:
      return state
  }
}

