import { createReducer } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGIN_FAIL, IS_LOADING, LOGOUT } from "../actions/authAction";

interface AuthReducerStateI {
  isAuthenticated: boolean;
  userId?: number;
  firstName?: string;
  roles?: string[];
  isLoading: boolean;
  loginError?: string;
}

const state: AuthReducerStateI = {
  isAuthenticated: false,
  isLoading: false,
};

const authReducer = createReducer(state, (builder) => {
    console.log("IS_LOADING: ", IS_LOADING);
  builder
    .addCase(IS_LOADING, (state, action) => {
      state.isLoading = true;
    })
    .addCase(LOGIN_SUCCESS, (state, action) => {
      const { id, firstName, roles } = action.payload.user;
      state.userId = id;
      state.firstName = firstName;
      state.roles = roles;
      state.isLoading = false;
      state.isAuthenticated = true;
    })
    .addCase(LOGIN_FAIL, (state, action) => {
      state.loginError = action.payload.message;
      state.isLoading = false;
    })
    .addCase(LOGOUT, (state, action) => {
      state.isAuthenticated = false;
    })
});

export default authReducer;
