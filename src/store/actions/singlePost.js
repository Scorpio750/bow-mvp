import axios from 'axios'

//Initial State
export const defaultPost = {}

//Action Types
export const GET_SINGLE_POST = 'GET_SINGLE_POST'
export const CREATE_SINGLE_POST = 'CREATE_POST'
export const REMOVE_SINGLE_POST = 'REMOVE_POST'

//Actions
export const setSinglePost = singlePost => async dispatch => {
  dispatch({ type: GET_SINGLE_POST, singlePost });
}
export const addSinglePost = (artwork) => async dispatch => {
  dispatch(({ type: CREATE_SINGLE_POST, artwork }));
}
export const removeSinglePost = (id) => async dispatch => {
  dispatch(({ type: REMOVE_SINGLE_POST, id }));
}

//Thunks
export const fetchSinglePost = (postId) => async dispatch => {
  try{
    const { data } = await axios.get(`/api/post/${postId}`)
    console.log(data)
    dispatch(setSinglePost(data))
  }
  catch(err) {
    console.log(err)
  }
}
