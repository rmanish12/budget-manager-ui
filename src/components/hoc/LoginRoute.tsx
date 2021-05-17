/* eslint-disable import/first */
import { authContext } from "./Base";
import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

interface LoginRouteI {
  children: JSX.Element;
  path: string;
  exact?: boolean;
}

interface LocationI {
  from: { pathname: string };
}

const LoginRoute: React.FC<LoginRouteI> = ({ children, ...rest }) => {
  const auth = useContext(authContext);
  const location = useLocation<LocationI>();
  const { from } = location.state || { from: { pathname: "/" } };
  let { pathname } = from;

  pathname = pathname === "/" ? "/home" : pathname;
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: pathname,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default LoginRoute;
