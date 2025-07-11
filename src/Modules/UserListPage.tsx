import { Box, IconButton, Typography } from "@mui/material";
import UserList from "./UserList";
import LogoutIcon from "@mui/icons-material/Logout";
import store from "../state/RootReducer";
import { UserStateActions } from "../state/User/Action";

const UserListPage = () => {
  const actionOnLogout = (): void => {
    store.dispatch(UserStateActions.doLogout({}));
  };
  return (
    <>
      <Box className="user-page">
        <Box className="header p-2">
          <Typography variant="body1" className="mx-3">
            Elon Musk
          </Typography>
          <IconButton className="mx-2 icon-btn" onClick={actionOnLogout}>
            <LogoutIcon className="log-icon" fontSize="small" />
          </IconButton>
        </Box>
        <UserList />
      </Box>
    </>
  );
};
export default UserListPage;
