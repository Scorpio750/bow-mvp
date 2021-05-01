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
export const SORT_BY_TITLE = 'SORT_BY_TITLE'
export const SORT_BY_ARTIST = 'SORT_BY_ARTIST'
export const SORT_ALPHA = 'SORT_ALPHA'
export const SORT_REVERSE_ALPHA = 'SORT_REVERSE_ALPHA'
export const SORT_NEWEST = 'SORT_NEWEST'
export const SORT_OLDEST = 'SORT_OLDEST'
export const SORT_ARTIST = 'SORT_ARTIST'
export const SORT_REVERSE_ARTIST = 'SORT_REVERSE_ARTIST'


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

export const titleSort = () => ({
  type: SORT_ALPHA
})


export const reverseAlpha = () => ({
  type: SORT_REVERSE_ALPHA
})

export const newestYear = () => ({
  type: SORT_NEWEST
})

export const oldestYear = () => ({
  type: SORT_OLDEST
})

export const sortByArtist = () => ({
  type: SORT_ARTIST
})

export const reverseArtist = () => ({
  type: SORT_REVERSE_ARTIST
})
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

