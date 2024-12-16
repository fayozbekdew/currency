import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../sections";

function MainLayout() {
  return (
    <div className="">
      <Sidebar />
      <Header />
      <main className="main pl-[310px] pr-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
