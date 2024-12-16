import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavigationItem({ nav, activePage, setActivePage }) {
  return (
    <Link
      onClick={() => {setActivePage(nav.link)
      
      }}
      to={nav.link}
      className={`flex items-center gap-x-2 pl-4 py-2 ${
        activePage
          ? "bg-blue-400   rounded-sm text-white"
          : "text-black bg-inherit"
      }`}
    >
      <span className="text-[25px]">{nav?.icon}</span>
      <p className="text-[20px] font-semibold">{nav.title}</p>
    </Link>
  );
}

export default NavigationItem;
