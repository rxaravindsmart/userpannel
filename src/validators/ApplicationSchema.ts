import * as Yup from "yup";

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  rememberMe: Yup.boolean()
    .oneOf([true], "Please accept Remember Me")
    .required("Required"),
});

const UserSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  avatar: Yup.string()
    .url("Must be a valid URL")
    .required("Avatar is required"),
});

export { LoginValidationSchema, UserSchema };
