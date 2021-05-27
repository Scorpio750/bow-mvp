import {
  GET_ARTIST,
  REMOVE_ARTIST,
} from '../../actions/artist'

const defaultArtist = {}

export default function artist(state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTIST:
      return action.artist
    case REMOVE_ARTIST:
      return defaultArtist
    default:
      return state
  }
}
