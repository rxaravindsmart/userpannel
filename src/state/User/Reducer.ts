import update from "immutability-helper";
import { UserPannelReduxAction } from "./Action";

export interface IUser {
  first_name: string;
  last_name: string;
  avatar: string;
  id?: number;
  email: string;
}

export interface IUserState {
  isUserLoggedIn: boolean;
  token: string;
  user: IUser[];
}

const UserPannelState: IUserState = {
  isUserLoggedIn: false,
  token: "",
  user: [],
};

const ApplicationReducer = (
  state = UserPannelState,
  action: any
): IUserState => {
  switch (action.type) {
    case UserPannelReduxAction.SET_USER_LOGIN:
      return update(state, {
        isUserLoggedIn: { $set: true },
        token: { $set: action.payload },
      });

    case UserPannelReduxAction.SET_USER_LIST:
      return update(state, {
        user: { $set: action.payload },
      });

    case UserPannelReduxAction.LOGOUT:
      return UserPannelState;

    default:
      return state;
  }
};

export default ApplicationReducer;
