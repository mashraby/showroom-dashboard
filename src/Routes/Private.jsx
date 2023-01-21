import { Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";

const Private = () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Login /> && (window.location.href = "/login");
  } else {
    return <Outlet />
  }
};

export default Private;