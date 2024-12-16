import React from "react";
import { Link } from "react-router-dom";

function NavigationItem({ nav }) {
  return (
    <Link to={nav.link} className="flex items-center gap-x-2">
      <span className="text-[25px]">{nav?.icon}</span>
      <p className="text-[20px] font-semibold">{nav.title}</p>
    </Link>
  );
}

export default NavigationItem;
