import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../App.css";
import { onLogin, LoginI } from "../../../actions/authAction";

import { TextField, Button } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface LoginPropsI {
  // onLogin: (credentials: LoginI) => void;
}

const Login: React.FC<LoginPropsI> = (props) => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.auth.loginError);

  const [credentials, setCredentials] = useState<LoginI>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(onLogin(credentials));
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div>
          <TextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            className="form-field"
            value={credentials.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            label="Password"
            className="form-field"
            value={credentials.password}
            onChange={onChangeHandler}
          />
        </div>

        <Button className="login-button" type="submit">
          LOGIN
        </Button>
      </form>

      <div className="error">{errorMessage}</div>

      <div className="forgot-password-div">
        <span className="forgot-password">Forgot Password?</span>
      </div>

      <div className="forgot-password-div">
        <span className="forgot-password">Create Account?</span>
      </div>
    </>
  );
};

export default Login;
