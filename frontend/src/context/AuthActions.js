import axios from 'axios';

export const login = async (dispatch, userData) => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.response.data.msg,
    });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
