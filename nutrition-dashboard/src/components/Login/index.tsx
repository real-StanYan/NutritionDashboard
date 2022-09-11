import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { login } from "../../store/main";
import { useDispatch } from "react-redux";

import "./index.css";
import { log } from "console";

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 4,
  },
  "& input:invalid + fieldset": {
    borderColor: "white",
    borderWidth: 3,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
  "& #validation-outlined-input-label": {
    color: "white",
  },
  "& #validation-outlined-input": {
    color: "white",
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    color: "white",
  },
}));

export default function Login() {
  const [alignment, setAlignment] = React.useState("Login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [repasswordError, setRePasswordError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setRegisterError(false);
    setRegisterSuccess(false);
    setLoginError(false);
    setLoginSuccess(false);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const inputUsername = (e: any) => {
    const value = e.target.value.trim().length;
    if (value <= 3 || value >= 10) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      setUsername(e.target.value);
    }
  };
  const inputPassword = (e: any) => {
    const value = e.target.value.trim().length;
    if (value <= 5 || value >= 15) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassword(e.target.value);
    }
  };
  const inputRePassword = (e: any) => {
    if (e.target.value === password) {
      setRePasswordError(false);
    } else {
      setRePasswordError(true);
    }
  };
  const registerRequest = () => {
    if (
      usernameError ||
      passwordError ||
      repasswordError ||
      username === "" ||
      password === ""
    ) {
      setRegisterError(true);
      return;
    } else {
      axios
        .post("http://localhost:8888/users", {
          username,
          password,
        })
        .then((res) => {
          console.log(res);
          setRegisterSuccess(true);
          setAlignment("Login");
        })
        .catch((err) => {
          console.log(err);
          setRegisterError(true);
        });
    }
  };
  const loginRequest = () => {
    if (
      usernameError ||
      passwordError ||
      repasswordError ||
      username === "" ||
      password === ""
    ) {
      setLoginError(true);
      return;
    } else {
      axios
        .get(`http://localhost:8888/users?username=${username}`)
        .then((res) => {
          if (res.data[0].password === password) {
            setLoginSuccess(true);
            dispatch(login(true));
            console.log(res);
          } else {
            setLoginError(true);
          }
        })
        .catch((err) => {
          setLoginError(true);
          console.log(err);
        });
    }
  };
  return (
    <div className="login-wrapper">
      {/* Register-Failed-Message */}
      <Snackbar
        open={registerError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Register Failed!
        </Alert>
      </Snackbar>
      {/* Register-Successed-Message */}
      <Snackbar
        open={registerSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Register Successed!
        </Alert>
      </Snackbar>
      {/* Login-Failed-Message */}
      <Snackbar open={loginError} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Login Failed!
        </Alert>
      </Snackbar>
      {/* Login-Successed-Message */}
      <Snackbar
        open={loginSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login Successed!
        </Alert>
      </Snackbar>
      <img src="./favicon.ico" className="login-icon" />
      <StyledToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="Login">Login</ToggleButton>
        <ToggleButton value="Register">Register</ToggleButton>
      </StyledToggleButtonGroup>
      {alignment === "Login" ? (
        // Login-Form
        <Box
          autoComplete="off"
          component="form"
          noValidate
          className="login-form"
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <ValidationTextField
            autoFocus={true}
            label="Username"
            required
            variant="outlined"
            defaultValue=""
            onChange={inputUsername}
            id="validation-outlined-input"
            // error={usernameError}
          />
          <ValidationTextField
            label="Password"
            required
            variant="outlined"
            defaultValue=""
            onChange={inputPassword}
            id="validation-outlined-input"
            // error={passwordError}
          />
          <Button variant="contained" onClick={loginRequest}>
            Login
          </Button>
        </Box>
      ) : (
        // Register-Form
        <Box
          autoComplete="off"
          component="form"
          noValidate
          className="login-form"
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <ValidationTextField
            autoFocus={true}
            label={usernameError ? "Expected between 3 - 10" : "Username"}
            required
            variant="outlined"
            defaultValue=""
            onChange={inputUsername}
            id="validation-outlined-input"
            error={usernameError}
          />
          <ValidationTextField
            label={passwordError ? "Expected between 5 - 15" : "Password"}
            required
            variant="outlined"
            defaultValue=""
            onChange={inputPassword}
            id="validation-outlined-input"
            error={passwordError}
          />
          <ValidationTextField
            label={repasswordError ? "Password does not match" : "Password"}
            required
            variant="outlined"
            defaultValue=""
            onChange={inputRePassword}
            id="validation-outlined-input"
            error={repasswordError}
          />
          <Button variant="contained" onClick={registerRequest}>
            Register
          </Button>
        </Box>
      )}
    </div>
  );
}
