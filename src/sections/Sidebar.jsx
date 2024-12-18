import { Fragment, useState, useEffect } from "react";
import NavigationItem from "../components/NavigationItem";
import { SiConvertio } from "react-icons/si";
import { AiOutlineTransaction } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";

function Sidebar() {
  const [activePage, setActivePage] = useState(localStorage.getItem("activePage") || "/");
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);
  const navigation = [
    {
      link: "/",
      icon: <AiOutlineTransaction />,
      title: "My transaction",
    },
    { link: "/statistics", icon:<FcStatistics />, title: "Statistics" },
    { link: "/convert", icon: <SiConvertio />, title: "Convert" },
  ];
  return (
    <div className="flex w-full max-w-[300px] min-h-screen fixed top-0 z-10 bg-gray-100 border-r-2 border-gray-700 flex-col">
      <div className="flex items-center space-x-2 justify-center  pb-4">
        <span className="text-4xl font-extrabold text-blue-600 tracking-wide">
          Transaction
        </span>
      </div>
      <div className="flex flex-col gap-y-3 pl-3 mt-4">
        {navigation.map((nav) => (
          <Fragment key={nav.link}>
            <NavigationItem
              activePage={activePage == nav.link}
              nav={nav}
              setActivePage={setActivePage}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
