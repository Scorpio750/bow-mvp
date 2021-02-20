import {
  GET_SINGLE_POST,
  CREATE_SINGLE_POST,
  REMOVE_SINGLE_POST,
  defaultPost
} from '../../actions/singlePost'


export default function singlePost(state = defaultPost, action) {
  switch (action.type) {
    case GET_SINGLE_POST:
      return action.singlePost
    case CREATE_SINGLE_POST:
      return action.artwork
    case REMOVE_SINGLE_POST:
      return defaultPost
    default:
      return state
  }
}
