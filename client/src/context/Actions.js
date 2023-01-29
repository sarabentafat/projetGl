import ActionsTypes from "./ActionsTypes";

export const LoginStart = (userCredentials) => ({
  type: ActionsTypes.LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: ActionsTypes.LOGIN_SUCESS,
  payload: user,
});

export const LoginFailure = () => ({
  type: ActionsTypes.LOGIN_FAILURE,
});
