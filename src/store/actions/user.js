import axios from 'axios'
import history from '../../history'
import { fetchPost } from './posts'


//Initial State
export const defaultUser = {}

//Action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_ERROR = 'SET_ERROR'
export const SET_OK = 'SET_OK'


//Actions
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
export const errorOnLogin = (err) => ({type: SET_ERROR, err})
export const successOnLogin = (status) => ({type: SET_OK, status})
export const errorOnSignup = (err) => ({type: SET_ERROR, err})
export const successOnSignup = (status) => ({type: SET_OK, status})

//Thunks
//for authorization
export const authUser = (credentials) => async dispatch => {
  try{
    await axios.post('/auth/login', credentials)
    dispatch(fetchUser())
    dispatch(successOnLogin(200))
  }
  catch(err) {
    dispatch(errorOnLogin(err.response.status))
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
    dispatch(getUser(data || defaultUser))
    dispatch(successOnSignup(200))

    history.push('/feed')
  }
  catch(err) {
    dispatch(errorOnSignup(err.response.status))
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
