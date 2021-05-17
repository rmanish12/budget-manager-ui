import React, { useEffect, createContext } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { checkUserLoginStatus } from "../../actions/authAction";

interface BasePropsI {
  children: JSX.Element;
}

export const authContext = createContext(false);

const Base: React.FC<BasePropsI> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, []);

  return (
    <authContext.Provider value={isAuthenticated}>
      {children}
    </authContext.Provider>
  );
};

export default Base;
