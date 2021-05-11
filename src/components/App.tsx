import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./main/Main"
import Home from "./home/Home";

function App() {
  return (
    <>
    <Switch>
      <Route path="/" exact component={Main}/>

      <Route path="/home" component={Home} />
    </Switch>
    </>
  );
}

export default App;
