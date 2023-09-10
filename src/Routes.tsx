import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignupStep1 from "./pages/signup/step1";
import SignupStep2 from "./pages/signup/step2";

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupStep1 />} />
      <Route path="/salon-signup" element={<SignupStep2 />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Router>
  );
};

export default Routes;
