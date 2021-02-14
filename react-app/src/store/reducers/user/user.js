import {
  GET_USER,
  REMOVE_USER,
  defaultUser
} from '../../actions/user'


export default function user(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
