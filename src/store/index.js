import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import  user from './reducers/user/user'
import {posts, singlePost} from './reducers/post'
let reducer = combineReducers({
  user,
  //Potential additions
  posts,
  singlePost,
  // tags,
  //search
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)


export default store
