import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const CheckAuth = (
  isUserLoggedIn: boolean,
  Component: ReactElement
): ReactElement => {
  return isUserLoggedIn ? Component : <Navigate to="/login" replace />;
};
