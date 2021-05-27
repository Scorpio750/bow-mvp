import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import persistState from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import  user from './reducers/user/user'
import  artist from './reducers/artist/artist'
import { feedPosts, artistPosts } from './reducers/post/posts'
import singlePost from './reducers/post/singlePost'
import response from './reducers/user/response'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let reducer = combineReducers({
  user,
  artist,
  //Potential additions
  feedPosts,
  artistPosts,
  singlePost,
  response,
  // tags,
  //search
})

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  persistState(
    [
      'user',
    ],
    {
      key: 'kowtowbitches',
    }
  )
)

const store = createStore(reducer, enhancer)

export default store
