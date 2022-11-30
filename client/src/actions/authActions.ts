import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../setAuthToken'
import { INDICATE_NO_ERRORS, GET_ERRORS, SET_CURRENT_USER } from './actionTypes'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 30000,
})

export const registerUser = (user: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
  axiosInstance
    .post('/users/signup', user)
    .then(() => {
      dispatch({
        type: INDICATE_NO_ERRORS,
        payload: {
          success: true,
        },
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const loginUser = (user: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
  axiosInstance
    .post('/users/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const setCurrentUser = (decoded: unknown) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
})

export const updateCurrentUser = (avatarColor: any, bio: any, email: any, name: any, userId: any, showEmail: any) => (dispatch: (arg0: { type: string; payload: any }) => void) =>
  axiosInstance
    .patch(`/users/${userId}`, { avatarColor, bio, email, name, showEmail })
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => console.log(err))

export const logoutUser = () => (dispatch: (arg0: { type: string; payload: any }) => void) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  window.location.href = '/login'
}
