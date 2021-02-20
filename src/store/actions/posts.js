import axios from 'axios'

//Initial State
export const defaultPosts = []

//Action Types
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_SINGLE_POST = 'GET_SINGLE_POST'
export const GET_ARTIST_POSTS = 'GET_ARTIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

//Actions
export const getAllPosts = (artwork) => async dispatch => {
  dispatch({ type: GET_ALL_POSTS, artwork});
}
export const createPost = (artwork) => async dispatch => {
  dispatch(({ type: ADD_POST, artwork }));
}
export const removePost = () => async dispatch => {
  dispatch(({ type: REMOVE_POST }));
}

//Thunks
export const fetchPost = () => async dispatch => {
  try{
    const { data } = await axios.get('/api/post')
    dispatch(getAllPosts(data || defaultPosts))
  }
  catch(err) {
    console.log(err)
  }
}

