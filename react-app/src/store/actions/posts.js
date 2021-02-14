import axios from 'axios'
import history from '../../history'


//Initial State
export const defaultPosts = []

//Action Types
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ARTIST_POSTS = 'GET_ARTIST_POSTS'
export const REMOVE_POST = 'REMOVE_POST'

//Actions
export const getAllPosts = () => async dispatch => {
  dispatch({ type: GET_ALL_POSTS });
}
export const getArtistPosts = () => async dispatch => {
  dispatch({ type :GET_ARTIST_POSTS });
}
export const removePost = () => async dispatch => {
  dispatch(({ type: REMOVE_POST }));
}

//Thunks
// Passport Potential
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }
