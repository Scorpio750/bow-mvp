import {
  SET_ERROR,
  SET_OK,
  RESET_RESPONSE,
} from '../../actions/user'


export default function response(state = { status: 100, statusText: 'Continue' }, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.err
    case SET_OK:
      return { status: 200, statusText: 'OK' }
    case RESET_RESPONSE:
      return { status: 100, statusText: 'Continue' }
    default:
      return state
  }
}
