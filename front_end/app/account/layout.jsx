import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const AccountLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default AccountLayout;
