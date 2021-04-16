import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import  user from './reducers/user/user'
import { feedPosts, artistPosts } from './reducers/post/posts'
import singlePost from './reducers/post/singlePost'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let reducer = combineReducers({
  user,
  //Potential additions
  feedPosts,
  artistPosts,
  singlePost,
  // tags,
  //search
})

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware)
)

const store = createStore(reducer, enhancer)

export default store
