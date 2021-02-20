import axios from 'axios'
import history from '../../history'


//Initial State
export const defaultUser = {}

//Action Types
export const GET_ARTIST = 'GET_ARTIST'
export const REMOVE_ARTIST = 'REMOVE_ARTIST'
export const UPDATE_ARTIST = 'UPDATE_ARTIST'

//Actions
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

//Thunks
//for authorization
export const authUser = (credentials) => async dispatch => {
  try{
    await axios.post('/auth/login', credentials)
    dispatch(fetchUser())
  }
  catch(err) {
    console.log(err)
  }
}

//for the user object
export const fetchUser = () => async dispatch => {
  try{
    const { data } = await axios.get('/api/user/login')
    dispatch(getUser(data || defaultUser))
    history.push('/feed')
  }
  catch(err) {
    console.log(err)
  }
}

export const logout = () => async dispatch => {
  try{
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  }
  catch(err) {
    console.err(err)
  }
}
