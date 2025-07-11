import { ReactElement, useEffect, useState } from "react";
import { UserListService } from "../services/UserService";
import {
  Box,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Button, Card, Table } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ListIcon from "@mui/icons-material/List";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { UserStateActions } from "../state/User/Action";
import { connect } from "react-redux";
import { IUser } from "../state/User/Reducer";
import UserDialog from "./components/UserDialog";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { toast } from "react-toastify";

const UserList = (props: any): ReactElement => {
  const { applicationState, setUserList } = props;
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  let inputValue = search;

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };
  const handleSearchClick = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setSearch("");
    inputValue = "";
    setCurrentPage(1);
  };

  const filteredUsers = applicationState.user.filter(
    (user: IUser) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers =
    activeView === "table"
      ? filteredUsers.slice((currentPage - 1) * 5, currentPage * 5)
      : filteredUsers;

  const actionOnDelete = () => {
    if (selectedUser?.id !== undefined) {
      UserListService.deleteUser(selectedUser.id)
        .then(() => {
          const updatedData = applicationState.user.filter(
            (user: IUser) => user.id !== selectedUser.id
          );
          setUserList(updatedData);
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          const { error: errMsg } = error.response?.data || {};
          toast.error(errMsg || "Something went wrong");
        })
        .finally(() => {
          setShowConfirm(false);
        });
    } else {
      toast.error("User ID not found for deletion.");
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    if (applicationState?.user?.length === 0) {
      UserListService.getUsers()
        .then((res: any) => {
          setUserList(res.data.data);
        })
        .catch((err: any) => {
          console.error("Error:", err);
        });
    }
  }, []);

  return (
    <Box className="users-container">
      <Box className="users">
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6">Users</Typography>
          </Grid>
          <Grid item xs={9} textAlign="end">
            <TextField
              key={search}
              type="text"
              placeholder="input search text"
              defaultValue={search}
              onChange={(e) => {
                inputValue = e.target.value;
              }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {search && (
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        edge="end"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderLeft: "1px solid #ccc",
                        paddingLeft: 8,
                        marginLeft: 4,
                      }}
                    >
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleSearchClick(inputValue)}
                        aria-label="search"
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className="btn-create"
              variant="outlined"
              onClick={() => {
                setOpen(true);
              }}
            >
              Create User
            </Button>
          </Grid>
        </Grid>

        <Box display="flex" className="toggle" mt={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{
              padding: "5px",
              cursor: "pointer",
              color: activeView === "table" ? "#1976d2" : "black",
              border:
                activeView === "table"
                  ? "1px solid #1976d2"
                  : "1px solid #d8d8d8",
            }}
            onClick={() => setActiveView("table")}
          >
            <TableRowsIcon fontSize="small" />
            <Typography variant="caption" ml={0.5}>
              Table
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{
              padding: "5px",
              cursor: "pointer",
              color: activeView === "card" ? "#1976d2" : "black",
              border:
                activeView === "card"
                  ? "1px solid #1976d2"
                  : "1px solid #d8d8d8",
            }}
            onClick={() => setActiveView("card")}
          >
            <ListIcon fontSize="small" />
            <Typography variant="caption" ml={0.5}>
              Card
            </Typography>
          </Box>
        </Box>
        {activeView === "table" && (
          <TableContainer sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user: IUser) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50px",
                        }}
                      />
                    </TableCell>
                    <TableCell className="blue">{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>
                      <Button
                        className="btn-prime my-2 px-3"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        className="btn-error mx-2 px-3"
                        onClick={() => {
                          setShowConfirm(true);
                          setSelectedUser(user);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Card View */}
        {activeView === "card" && (
          <Grid container spacing={2} mt={2}>
            {paginatedUsers.map((user: IUser) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card className="custom-user-card">
                  <Box className="overlay-actions">
                    <IconButton
                      className="action-btn edit"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpen(true);
                      }}
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      className="action-btn delete"
                      onClick={() => {
                        setShowConfirm(true);
                        setSelectedUser(user);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <CardContent className="card-body">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="avatar-img"
                    />
                    <Typography variant="h6" className="user-name">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" className="user-email">
                      {user.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {activeView === "table" && (
          <Box mt={2} display="flex" justifyContent="end">
            <Pagination
              count={Math.ceil(filteredUsers.length / 5)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        )}
        {open && (
          <UserDialog
            {...props}
            open={open}
            onClose={() => {
              setOpen(false);
              setSelectedUser(null);
            }}
            selectedUser={selectedUser}
            initialValues={
              selectedUser !== null
                ? selectedUser
                : {
                    first_name: "",
                    last_name: "",
                    email: "",
                    avatar: "",
                  }
            }
            mode={selectedUser !== null ? "edit" : "create"}
          />
        )}
        {showConfirm && (
          <ConfirmDialog
            title="Delete"
            subTitle="Are you sure you want to delete this user"
            showConfirm={showConfirm}
            onClose={() => setShowConfirm(false)}
            actionOnDelete={actionOnDelete}
          />
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any): any => ({
  applicationState: state.applicationState,
});

const mapDispatchToProps = (dispatch: any): any => ({
  setUserList: (data: any) => dispatch(UserStateActions.setUserList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
