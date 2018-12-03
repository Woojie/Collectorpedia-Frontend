import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import axios from 'axios'


const FetchGetUserLoading = 'GETUSER_LOADING'
const FetchGetUserSuccess = 'GETUSER_SUCESS'
const UpdateUser = 'UPDATE_USER'


export const fetchGetUserLoading = () => ({
  type: FetchGetUserLoading
})


export const fetchGetUserSuccess = username => ({
  type: FetchGetUserSuccess,
  payload: {
    username
  }
})

export const getUsername = (username) =>{
  store.dispatch(fetchGetUserLoading())

  axios({
    method: 'get',
    url: 'http://localhost:3030/user/',
    withCredentials: true,
    crossDomain: true,
  })
    .then(response => { 
    if (response.data.user) {
      console.log('Get User: There is a user saved in the server session: ')
      console.log('user', response.data.user.username)
      return store.dispatch(fetchGetUserSuccess(response.data.user.username))
    } else {
      console.log('Get user: no user');
      return  store.dispatch(fetchGetUserSuccess(null))
    }
  })

}

export const updateUser = (username, password) =>({
  type: UpdateUser,
  payload: {
    username, 
    password
  }
})


const initialState = {
  username: null,
  loggedIn: false, 
  loading: false,
}


const AppReducer = (currentState=initialState, action) =>{
  switch(action.type){
    case FetchGetUserLoading:
      return {
        ...currentState,
        loading: true
      }
    case FetchGetUserSuccess:
      return {
        ...currentState,
        loading: false,
        username:  action.payload.username,
        loggedIn: action.payload.username === null ? false : true
      }
    case UpdateUser:
      return{
        ...currentState, 
        loggedIn: false,
        username: null
      }
    default: return currentState
  }
}


const store = createStore(
  AppReducer,
  applyMiddleware(logger)
)

export default store