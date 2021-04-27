import React from "react";
import "../App.css";

import Login from "./login/Login";
import Register from "./register/Register";

import { Grid, Paper } from "@material-ui/core";

const Main = () => {
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10} sm={6}>
          <div className="login-card">
            <Paper>
              <div className="brand-name-div">
                <span className="brand-name">Budget Manager</span>
              </div>
              {/* <Login /> */}
              <Register />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
