import {
  GET_ALL_POSTS,
  ADD_POST,
  REMOVE_POST,
  defaultPosts
} from '../../actions/posts'


export default function posts(state = defaultPosts, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.artwork
    //TODO filter logic
    case ADD_POST:
      return [...state, action.artwork]
    case REMOVE_POST:
      return defaultPosts
    default:
      return state
  }
}
