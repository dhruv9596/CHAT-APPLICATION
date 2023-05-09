import {
  AllDispatchProp,
  API_URI,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  FORGOT_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOG_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REG_LOADING,
  USER_LOADED,
  FORGOT_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from './types';
import axios from 'axios';
import {returnErrors} from './errorActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socket} from './chatAction';

//* Register Action*//
export const register = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => async (dispatch: AllDispatchProp) => {
  dispatch({type: REG_LOADING, payload: null});

  const data = JSON.stringify({name, email, password});

  await axios({
    method: 'POST',
    url: `${API_URI}/api/users`,
    data,
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => {
      dispatch({type: CLEAR_ERRORS, payload: null});
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
      localStorage.setItem('messageapp-user', JSON.stringify(res.data));
      socket.emit('getUsers');
    })
    .catch((err) => {
      dispatch({type: REGISTER_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
    });
};

//* login action *//
export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (dispatch: AllDispatchProp, getState: any) => {
  dispatch({type: LOG_LOADING, payload: null});
  const data = JSON.stringify({email, password});
    await axios({
      method: 'POST',
      url: `${API_URI}/api/login`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
      },
    })
    .then((res) => {
      const {user} = res.data;
      if (user) {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
        localStorage.setItem('messageapp-user', JSON.stringify(res.data));
      }
    })
    .catch((err) => {
      dispatch({type: LOGIN_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );
    });
};

export const loadUser = () => async (dispatch: AllDispatchProp) => {
  dispatch({type: LOG_LOADING, payload: null});

  const token = await AsyncStorage.getItem('@user_token');

  axios({
    method: 'GET',
    url: `${API_URI}/api/login/user`,
    headers: {
      'content-type': 'application/json',
      'x-amazon-token': token,
    },
  })
    .then((res) => {
      dispatch({type: USER_LOADED, payload: res.data});
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, '', 'LOAD_FAIL'));
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    });
};


export const forgotPassword = ({email}: {email: string}) => async (dispatch: AllDispatchProp, getState: any) => {
 
  const data = JSON.stringify({email});
    await axios({
      method: 'POST',
      url: `${API_URI}/api/login/forgot_password`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
      },
    })
    .then((res) => {
      const {user} = res.data;
      if (user) {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({type: FORGOT_SUCCESS, payload: user.id});
      }
    })
    .catch((err) => {
      dispatch({type: FORGOT_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'FORGOT_FAIL'),
      );
    });
};


export const resetPassword = ({password, user_id}: {password: string, user_id: String}) => async (dispatch: AllDispatchProp, getState: any) => {
 
  const data = JSON.stringify({password, user_id});
    await axios({
      method: 'POST',
      url: `${API_URI}/api/login/reset_password`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
      },
    })
    .then((res) => {
      if (res) {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: true});
      }
    })
    .catch((err) => {
      dispatch({type: RESET_PASSWORD_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'RESET_PASSWORD_FAIL'),
      );
    });
};


//* Handle logout *//
export const logout = () => async (dispatch: AllDispatchProp) => {
  await AsyncStorage.removeItem('@user_token');
  return dispatch({
    type: LOGOUT_SUCCESS,
    payload: null,
  });
};
