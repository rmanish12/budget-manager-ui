import React, { useState, useRef, ChangeEvent, FormEvent, MouseEvent, useLayoutEffect } from "react";
import "../../App.css";
import { onLogin, LoginI } from "../../../actions/authAction";

import { TextField, Button } from "@material-ui/core";
import Loader from "../../loader/Loader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface LoginPropsI {
  switchLoginWindow: (value: boolean) => void;
}

const Login: React.FC<LoginPropsI> = (props) => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.auth.loginError); // loginError value from auth reducer
  const showLoader = useAppSelector((state) => state.auth.isLoading); // isLoading value from auth reducer

  // function to switch to register screen
  const { switchLoginWindow } = props;

  // using ref to refer email input
  const emailInput = useRef<HTMLInputElement>(null);

  // defining state to get user credentials
  const [credentials, setCredentials] = useState<LoginI>({
    email: "",
    password: "",
  });

  // handler to set value from user changes
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // handler to perform operation when form is submitted
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(onLogin(credentials));
  };

  // function that gets called when user wants to switch to register screen
  const onSwitchToRegisterWindow = (e: MouseEvent<HTMLDivElement>) => {
    switchLoginWindow(false);
  }

  // useLayoutEffect to set focus on email input field
  useLayoutEffect(() => {
    if (emailInput && emailInput.current) {
      emailInput.current.focus();
    }
  })

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
            inputRef={emailInput}
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

      <div className="forgot-password-div" onClick={onSwitchToRegisterWindow}>
        <span className="forgot-password">Create Account?</span>
      </div>

      <Loader show={showLoader}/>
    </>
  );
};

export default Login;
