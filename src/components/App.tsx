import React from "react";
import { Switch } from "react-router-dom";

import Base from "./hoc/Base";
import ProtectedRoutes from "./hoc/ProtectedRoutes";
import LoginWrapper from "./hoc/LoginRoute";
import Main from "./main/Main";
import Home from "./home/Home";
import UserProfile from "./home/userProfile/UserProfile";

function App() {
  return (
    <>
      <Base>
        <Switch>
          <LoginWrapper path="/" exact={true}>
            <Main />
          </LoginWrapper>

          <ProtectedRoutes path="/home">
            <Home />
          </ProtectedRoutes>

          <ProtectedRoutes path="/home">
            <Home />
          </ProtectedRoutes>

          <ProtectedRoutes path="/profile">
            <UserProfile />
          </ProtectedRoutes>
        </Switch>
      </Base>
    </>
  );
}

export default App;
