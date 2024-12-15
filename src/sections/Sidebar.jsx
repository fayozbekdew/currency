import { Fragment } from "react";
import { HomeIcon } from "../assets";
import NavigationItem from "../components/NavigationItem";

function Sidebar() {
  const navigation = [
    { link: "/", img: HomeIcon, title: "Home" },
    { link: "/currency", img: HomeIcon, title: "Realtime Currency" },
    { link: "/transaction", img: HomeIcon, title: "My transaction" },
    { link: "/convert", img: HomeIcon, title: "Convert" },
    { link: "/myProfile", img: HomeIcon, title: "My profile" },
  ];
  return (
    <div className="flex w-full max-w-[300px] min-h-screen fixed top-0 z-10 bg-gray-100 border-r-2 border-gray-700 flex-col">
      <h1 className="ml-3 font-mono text-[30px] font-bold">Currency</h1>
      <div className="flex flex-col gap-y-3 pl-3 mt-4">
      {navigation.map((nav) => (
        <Fragment key={nav.link}>
            <NavigationItem nav={nav}/>
        </Fragment>
      ))}
      </div>
    </div>
  );
}

export default Sidebar;
