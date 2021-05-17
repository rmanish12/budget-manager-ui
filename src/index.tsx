import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import axios from "axios";
import history from "./history";

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
