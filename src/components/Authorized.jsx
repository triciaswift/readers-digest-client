import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Authorized = () => {
  if (localStorage.getItem("reader_token")) {
    return (
      <>
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
