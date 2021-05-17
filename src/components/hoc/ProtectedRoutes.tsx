import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "./Base";

interface ProtectedRoutesPropsI {
  children: JSX.Element;
  path: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesPropsI> = ({
  children,
  ...rest
}) => {
  const auth = useContext(authContext);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoutes;
