import axios from 'axios';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POST_LIKES
} from './actionTypes';

export const addComment = (
  action: Text,
  commenterId: Text,
  postId: Text,
  text: Text,
  timestamp: Date = new Date()
) => (dispatch: (arg0: { type: string; payload: any; commenterId: Text; text: Text; timestamp: Date; }) => any) =>
  axios
    .patch(`/posts/${postId}`, { action, commenterId, text, timestamp })
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
        commenterId,
        text,
        timestamp
      }));

export const deleteComment = (action: any, commentId: any, postId: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  axios.patch(`/posts/${postId}`, { action, commentId }).then(res =>
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data
    }));

export const editComment = (action: any, commentId: any, postId: any, text: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  axios.patch(`/posts/${postId}`, { action, commentId, text }).then(res =>
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data
    }));

export const getPosts = () => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  axios.get('/posts').then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }));

export const createPost = (text: string, user: { name: any; userId?: any; avatarColor?: any; }) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  axios
    .post('/posts', {
      text,
      author: user.name,
      authorId: user.userId,
      avatarColor: user.avatarColor
    })
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      }));

export const editPost = (id: string, text: string, author: string) => (dispatch: (arg0: { type: string; id: any; text: any; author: any; }) => any) =>
  axios.patch(`/posts/${id}`, { id, text, author }).then(res =>
    dispatch({
      type: EDIT_POST,
      id,
      text,
      author
    }));

export const deletePost = (id: string) => (dispatch: (arg0: { type: string; id: any; }) => any) =>
  axios.delete(`/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      id
    }));

export const updatePostLikes = (action: any, postId: any, likerId: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) =>
  axios.patch(`/posts/${postId}`, { action, id: likerId }).then(res =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data
    }));
