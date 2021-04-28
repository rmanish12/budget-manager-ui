import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import axios from "axios";

export interface LoginI {
    email: string;
    password: string;
}

interface UserInfo {
    id: number;
    firstName: string;
    roles: string[];
}
interface LoginSuccessI {
    user: UserInfo;
    authToken: string;
}

interface LoginFailureI {
    message: string;
}

const LOGIN_URL = "/user/login";

export const IS_LOADING = createAction("IS_LOADING");
export const LOGIN_SUCCESS = createAction<LoginSuccessI>("LOGIN_SUCCESS");
export const LOGIN_FAIL = createAction<LoginFailureI>("LOGIN_FAIL");
export const LOGOUT = createAction("LOGOUT");

export const onLogin = (credentials: LoginI) => async (dispatch: Dispatch) => {

    const isLoading = IS_LOADING();
    dispatch(isLoading);

    try {
        const res = await axios.post(LOGIN_URL, credentials);

        const { user, authToken } = res.data;
        const loginSuccess = LOGIN_SUCCESS({
            user,
            authToken
        })

        dispatch(loginSuccess);

    } catch (err) {
        const loginFail = LOGIN_FAIL({
            message: err.response.data.message
        });

        dispatch(loginFail);
    }
};

export const onLogout = () => (dispatch: Dispatch) => {
    const logout = LOGOUT();
    dispatch(logout);
}