import LoginPage from "../Modules/LoginPage";
import UserListPage from "../Modules/UserListPage";
import { CheckAuth } from "./RootGuard";

const routes = (isUserLoggedIn: boolean) => [
  { path: "/login", element: <LoginPage /> },
  { path: "/user-list", element: CheckAuth(isUserLoggedIn, <UserListPage />) },
];

export default routes;
