import {
  SET_CURRENT_USER,
  LOGIN_ERR0RS,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOADING,
  USER_LOGOUT_SUCCESS,
  SET_LOGIN_VISIBLE,
  GET_ERRORS,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  hasRole: '',
  loading: false,
  savedReset: {},
  loginVisible: false,
  //   isSignup: false,
  //   signuperror: {},
  //   signupVisible: false,
  //   savedSignup: {},
};

export default function(state = initialState, action) {
  //   const { policy, name: roleType } =
  //     action.payload.policy && action.payload.policy[0]
  //       ? action.payload.policy[0].roletype_id
  //       : '';
  switch (action.type) {
    case SET_CURRENT_USER:
      // localStorage.setItem('role', roleType);
      // localStorage.setItem('policies', JSON.stringify(policy));

      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: {sucess: true, ...action.payload},
        hasRole: action.payload.role,
      };

    case LOGIN_ERR0RS:
      return {
        ...state,
        loading: false,
        user: {
          sucess: false,
          errors: action.payload,
        },
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        signuperror: action.payload.data,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGOUT:
      return undefined;
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };
    case SET_LOGIN_VISIBLE:
      return {
        ...state,
        loginVisible: action.payload,
      };

    default:
      return state;
  }
}
