import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const [isAdult, setIsAdult] = React.useState(false);

  React.useEffect(() => {
    setIsAdult(localStorage.getItem("adult"));
  }, []);
  return (
    <Route
      {...rest}
      render={() => (!isAdult ? children : <Redirect to="/main" />)}
    />
  );
};
