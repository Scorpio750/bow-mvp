import axios from 'axios'
import { get } from 'lodash'

//Initial State
export const defaultFeedPosts = Array(100).fill({})
export const defaultArtistPosts = Array(20).fill({})

//Action Types
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_SINGLE_POST = 'GET_SINGLE_POST'
export const GET_ARTIST_POSTS = 'GET_ARTIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

//Actions
export const getAllPosts = artworks => async dispatch => {
  dispatch({ type: GET_ALL_POSTS, artworks });
}
export const getArtistPosts = artworks => async dispatch => {
  dispatch({ type: GET_ARTIST_POSTS, artworks })
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
    dispatch(getAllPosts(data || defaultFeedPosts))
  }
  catch(err) {
    console.log(err)
  }
}

export const fetchArtistPosts = artistId => async (dispatch, getState) => {
  const { feedPosts } = getState()
  const artistPosts = feedPosts.filter(post => get(post, 'user.id') === artistId)
  dispatch(getArtistPosts(artistPosts))
}

