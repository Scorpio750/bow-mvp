import {
  SET_ERROR,
  SET_OK
} from '../../actions/user'


export default function error(state = 200, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.err
    case SET_OK:
      return 200

    default:
      return state
  }
}
