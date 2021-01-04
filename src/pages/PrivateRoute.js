import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import Loading from "./Loading";

const PrivateRoute = ({ component: RouteComponent }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : Loading;

  return <Route component={Component} />;
};

export default PrivateRoute;
