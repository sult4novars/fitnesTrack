// Authentication builds upon Krunal's guide:
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import {
  INDICATE_NO_ERRORS,
  GET_ERRORS,
  SET_CURRENT_USER
} from './actionTypes';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 30000,
})

export const registerUser = user => (dispatch) => {
  axiosInstance
    .post('/users/signup', user)
    .then((res) => {
      dispatch({
        type: INDICATE_NO_ERRORS,
        payload: {
          success: true
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => (dispatch) => {
  axiosInstance
    .post('/users/login', user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const updateCurrentUser = (
  avatarColor,
  bio,
  email,
  name,
  userId,
  showEmail
) => dispatch =>
axiosInstance
    .patch(`/users/${userId}`, { avatarColor, bio, email, name, showEmail })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/login';
};
