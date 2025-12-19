import { useUserStore } from "@stores";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
