import { useGet } from "@hooks";
import { useUserStore } from "@stores";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const { isBlocked } = useGet();
  const reset = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isBlocked) {
    reset();
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
