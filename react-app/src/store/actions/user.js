import axios from 'axios'
import history from '../../history'


//Initial State
export const defaultUser = []

//Action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'

//Actions
export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})

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
