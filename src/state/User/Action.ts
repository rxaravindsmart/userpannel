export enum UserPannelReduxAction {
  SET_USER_LOGIN = "SET_USER_LOGIN_STATUS",
  SET_USER_LIST = "SET_USER_LIST",
  LOGOUT = "LOGOUT",
}

const setLoginStatus = (payload: any): any => ({
  type: UserPannelReduxAction.SET_USER_LOGIN,
  payload,
});

const setUserList = (payload: any): any => ({
  type: UserPannelReduxAction.SET_USER_LIST,
  payload,
});

const doLogout = (payload: any) => ({
  type: UserPannelReduxAction.LOGOUT,
  payload,
});

export const UserStateActions = { setLoginStatus, setUserList, doLogout };
