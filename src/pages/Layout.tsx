import { Outlet } from "react-router";
import bgSource from "./../assets/bg.jpg";

export const Layout = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgSource})` }}
    >
      <Outlet />
    </div>
  );
};
