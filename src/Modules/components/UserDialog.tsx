import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ReactElement } from "react";
import { IUser, IUserState } from "../../state/User/Reducer";
import { UserListService } from "../../services/UserService";
import { toast } from "react-toastify";
import { UserSchema } from "../../validators/ApplicationSchema";

interface IUserDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues: IUser;
  mode: string;
  selectedUser: any;
  applicationState: IUserState;
  setUserList: (data: any) => void;
}

const UserDialog = (props: IUserDialogProps): ReactElement => {
  const {
    open,
    onClose,
    initialValues,
    mode,
    selectedUser,
    applicationState,
    setUserList,
  } = props;

  const handleFormSubmit = (values: any, formik: any) => {
    if (selectedUser === null) {
      UserListService.createUser(values)
        .then((res) => {
          const { data } = res;
          const { createdAt, ...rest } = data;
          const updatedData: any = [...applicationState.user];
          updatedData.push(rest);
          setUserList(updatedData);
          toast.success("User created successfully");
        })
        .catch((Error) => {
          const { error } = Error.response.data;
          toast.error(error);
        })
        .finally(() => {
          formik.setSubmitting(false);
          onClose();
        });
    } else {
      const { id, ...rest } = values;
      UserListService.updateUser(id, rest)
        .then((res) => {
          const { data } = res;
          const updatedData: any = applicationState.user.map((obj) =>
            obj.id === data.id ? data : obj
          );
          setUserList(updatedData);
          toast.success("User updated successfully");
        })
        .catch((Error) => {
          const { error } = Error.response.data;
          toast.error(error);
        })
        .finally(() => {
          formik.setSubmitting(false);
          onClose();
        });
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} className="user-dialog">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === "edit" ? "Edit User" : "Create New User"}
          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={UserSchema}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <Form autoComplete="off">
              <Box className="mb-1">
                <Typography variant="body1">First Name</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Please enter first name"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                  size="small"
                />
              </Box>
              <Box className="mb-1">
                <Typography variant="body1">Last Name</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Please enter last name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                  size="small"
                />
              </Box>
              <Box className="mb-1">
                <Typography variant="body1">Email</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Please enter email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  size="small"
                />
              </Box>
              <Box className="mb-1">
                <Typography variant="body1">Profile Image Link</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Please enter profile image link"
                  name="avatar"
                  value={values.avatar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.avatar && Boolean(errors.avatar)}
                  helperText={touched.avatar && errors.avatar}
                  size="small"
                />
              </Box>
              <Divider />

              <DialogActions sx={{ mt: 2 }}>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  className="btn-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-submit"
                  variant="outlined"
                  disabled={!isValid || !dirty || isSubmitting}
                  style={{
                    opacity: !isValid || !dirty || isSubmitting ? "0.7" : "1",
                  }}
                >
                  {mode === "edit" ? "Update" : "Create"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
