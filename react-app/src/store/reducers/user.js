import axios from 'axios'
import history from '../../history'


//Initial State
const defaultUser = []

//Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

//Actions
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

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

// Setting this up for a potential log in experience
export const auth = userObj => async dispatch => {
  try {
    let res
    if (userObj.method === 'signup') {
      res = await axios.post(`/auth/${userObj.method}`, {
        ...userObj
      })
      dispatch(getUser(res.data))
      //We could push to the content site instead of home page
      history.push('/')
    } else if (userObj.method === 'login') {
      res = await axios.post(`/auth/${userObj.method}`, {
        ...userObj
      })
      dispatch(getUser(res.data))
      history.push('/')
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}


export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

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
