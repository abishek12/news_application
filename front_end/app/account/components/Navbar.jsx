"use client"

import React from "react";
import SideBar from "./sideBar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const accountNavbar = () => {
  const router = useRouter();
  return (
    <div className="bg-[#0450A4] flex flex-row space-x-4 text-white text-md">
      <SideBar />

      <div className="flex justify-center items-center ">
        <button
          type="button"
          className="flex flex-row hover:bg-[#0362C7] hover:rounded-lg"
          onClick={() => {router.push("/")}}
        >
          <IoMdArrowRoundBack size={20} className="mr-1" />
          <span className="text-white">Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default accountNavbar;
