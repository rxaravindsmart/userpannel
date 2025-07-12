import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { ReactElement, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserListService } from "../services/UserService";
import { connect } from "react-redux";
import { UserStateActions } from "../state/User/Action";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LoginValidationSchema } from "../validators/ApplicationSchema";

const LoginPage = (props: any): ReactElement => {
  const { setLoginStatus } = props;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const actionOnFormSubmit = (formValues: any, formik: any) => {
    formik.setSubmitting(true);
    UserListService.loginUser({
      email: formValues.email,
      password: formValues.password,
    })
      .then((res) => {
        const token = res.data.token;
        if (token) {
          setLoginStatus(token);
          navigate("/user-list");
        }
      })
      .catch((Error: any) => {
        const { error } = Error.response.data;
        toast.error(error);
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  return (
    <Box className="login-container">
      <Box className="login-contents">
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={LoginValidationSchema}
          validateOnMount
          onSubmit={(formValues, formikHelpers) =>
            actionOnFormSubmit(formValues, formikHelpers)
          }
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
            isValid,
            dirty,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                placeholder="email *"
                name="email"
                className="input-filed mt-2"
                fullWidth
                size="small"
                required
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="password *"
                name="password"
                className="input-filed mt-4"
                fullWidth
                size="small"
                required
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormGroup className="mt-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={(e) =>
                        setFieldValue("rememberMe", e.target.checked)
                      }
                    />
                  }
                  label="Remember Me"
                />
                {touched.rememberMe && errors.rememberMe && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.rememberMe}
                  </div>
                )}
              </FormGroup>

              <Button
                variant="outlined"
                type="submit"
                fullWidth
                className="submit-btn mt-3 btn-prime"
                disabled={!isValid || !dirty || isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : null
                }
                style={{
                  opacity: !isValid || !dirty || isSubmitting ? "0.7" : "1",
                }}
              >
                {isSubmitting ? "PROCESSING..." : "Log in"}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

// ✅ mapDispatchToProps with single action SET_USER_LOGIN
const mapDispatchToProps = (dispatch: any): any => ({
  setLoginStatus: (token: string) =>
    dispatch(UserStateActions.setLoginStatus(token)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
