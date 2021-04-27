import { createReducer } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGIN_FAIL, IS_LOADING } from "../actions/authAction";

interface AuthReducerStateI {
    isLoggedIn: boolean;
    name?: string;
    gender?: string;
    roles?: string[];
    isLoading: boolean;
    loginError?: string
}

const state: AuthReducerStateI = {
    isLoggedIn: false,
    isLoading: false,
}

const authReducer = createReducer(state, builder => {
    builder.addCase(LOGIN_SUCCESS, (state, action) => {
            state.name = action.payload.name;
            state.gender = action.payload.gender;
            state.roles = action.payload.roles;
            state.isLoading = false;
            state.isLoggedIn = true;
        })
        .addCase(LOGIN_FAIL, (state, action) => {
            state.loginError = action.payload.loginError;
            state.isLoading = false;
        })
        .addCase(IS_LOADING, (state, action) => {
            state.isLoading = true
        });
})

export default authReducer;