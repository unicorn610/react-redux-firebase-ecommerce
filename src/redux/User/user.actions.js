import userTypes from './user.types';

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const resetPwdStart = userCredentials => ({
  type: userTypes.RESET_PWD_START,
  payload: userCredentials
});

export const resetPwdSuccess = () => ({
  type: userTypes.RESET_PWD_SUCCESS,
  payload: true
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE
});

export const userError = (err) => ({
  type: userTypes.USER_ERROR,
  payload: err,
});
