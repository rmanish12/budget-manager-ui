import React, { useState } from "react";
import "../App.css";

import Login from "./login/Login";
import Register from "./register/Register";

import { Grid, Paper } from "@material-ui/core";

const Main = () => {

  const [isLoginOpen, setLoginOpen] = useState<boolean>(true);

  const switchLoginWindow = (value: boolean) => {
    setLoginOpen(value);
  }

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10} sm={6}>
          <div className="login-card">
            <Paper>
              <div className="brand-name-div">
                <span className="brand-name">Budget Manager</span>
              </div>

              {isLoginOpen ? <Login switchLoginWindow={switchLoginWindow}/> : <Register switchLoginWindow={switchLoginWindow}/>}
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
