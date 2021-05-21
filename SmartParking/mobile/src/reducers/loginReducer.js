export const initialLoginState = {
  isLoading: true,
  username: null,
  userToken: null,
  loginError: null,
  registerError: null,
};

export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...prevState,
        loginError: action.error,
      };
    case 'REGISTER_ERROR':
      return {
        ...prevState,
        registerError: action.error,
      };
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        username: action.username,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        username: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        username: action.username,
        isLoading: false,
      };
  }
};
