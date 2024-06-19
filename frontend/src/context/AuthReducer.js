export default (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload.user,
        };
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  