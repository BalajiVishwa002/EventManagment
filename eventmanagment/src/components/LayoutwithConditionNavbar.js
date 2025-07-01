"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const LayoutwithConditionNavbar = ({children}) => {
  const pathname = usePathname();
  const navbar = pathname === "/" || pathname === "/login";
  return <>
  {navbar && <Navbar/>}
<main>
    {children}
</main>
  </>;  
};

export default LayoutwithConditionNavbar;
