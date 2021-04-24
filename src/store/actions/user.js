import axios from 'axios'
import history from '../../history'
import { fetchPost } from './posts'


//Initial State
export const defaultUser = {}

//Action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'

//Actions
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

//Thunks
//for authorization
export const authUser = (credentials) => async dispatch => {
  try{
    console.log('sending ', credentials)
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
    // removed to help us handle the 404 page
    // history.push('/feed')
  }
  catch(err) {
    console.log(err)
  }
}
export const logout = () => async dispatch => {
  try{
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
    dispatch(fetchPost())
  }
  catch(err) {
    console.err(err)
  }
}

export const signUp = (userObj) => async dispatch => {
  try{
    const { data } = await axios.post(`/auth/signup`, userObj)
    // dispatch(authUser(data || defaultUser))
    // ()
    dispatch(getUser(data || defaultUser))

    history.push('/login')
  }
  catch(err) {
    console.error(err)
  }
}


export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
