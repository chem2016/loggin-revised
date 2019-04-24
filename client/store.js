import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// action type
const SET_USER = 'SET_USER'

// action creator
const setUser = user => {
  return {
    type: SET_USER,
    user
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer
})

export const login = ({ email, password }) => {
  return dispatch => {
    return axios
      .post('/auth', { email, password })
      .then(({ data }) => dispatch(setUser(data)))
  }
}

export const sessionLogin = () => {
  return dispatch => {
    return axios.get('/auth').then(({ data }) => dispatch(setUser(data)))
  }
}

export const logout = () => {
  return dispatch => {
    return axios.delete('/auth').then(() => dispatch(setUser({})))
  }
}

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
