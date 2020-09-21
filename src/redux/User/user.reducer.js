import userTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  resetPwdSuccess: false,
  userErr: []
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: []
      }
    case userTypes.RESET_PWD_SUCCESS:
      return {
        ...state,
        resetPwdSuccess: action.payload
      }
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload
      }
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};

export default userReducer;
