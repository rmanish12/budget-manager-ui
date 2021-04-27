import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

export interface LoginI {
    email: string;
    password: string;
}

interface LoginSuccessI {
    name: string;
    gender: string;
    authToken: string;
    roles: string[];
}

interface LoginFailureI {
    loginError: string;
}

export const IS_LOADING = createAction("IS_LOADING");
export const LOGIN_SUCCESS = createAction<LoginSuccessI>("LOGIN_SUCCESS");
export const LOGIN_FAIL = createAction<LoginFailureI>("LOGIN_FAIL");

export const onLogin = (credentials: LoginI) => (dispatch: Dispatch) => {
    const loginFail = LOGIN_FAIL({loginError: "Something went wrong"});
    dispatch(loginFail);
};