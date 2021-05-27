import axios from 'axios'
import history from '../../history'


//Initial State
export const defaultUser = {}

//Action Types
export const GET_ARTIST = 'GET_ARTIST'
export const REMOVE_ARTIST = 'REMOVE_ARTIST'
export const UPDATE_ARTIST = 'UPDATE_ARTIST'

//Actions
export const getArtist = artist => ({ type: GET_ARTIST, artist })

//Thunks
export const fetchArtist = id => async dispatch => {
  try{
    const { data } = await axios.get(`/api/user/artist/${id}`)
    dispatch(getArtist(data || defaultUser))
  }
  catch(err) {
    console.log(err)
  }
}

