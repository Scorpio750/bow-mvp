import {
  GET_ALL_POSTS,
  GET_ARTIST_POSTS,
  CREATE_POST,
  REMOVE_POST,
  defaultPosts
} from '../../actions/posts'


export default function posts(state = defaultPosts, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts
    //TODO filter logic
    case GET_ARTIST_POSTS:
      return
    case CREATE_POST:
      return state.posts
    case REMOVE_POST:
      return state.posts
    default:
      return state
  }
}
