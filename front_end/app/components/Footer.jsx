import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="mx-auto w-full">
      <div className="flex justify-center gap-10 bg-[#0450A4] p-12 text-white font-bold flex-col md:flex-row">
        <div className="mx-auto">
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="Picture of the author"
            className="w-full max-w-[100px] my-6"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="mx-auto">Abishek Khanal</div>
          <div className="mx-auto">Tunaa Technology</div>
          <div className="mx-auto">98000000000</div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="mx-auto">Chairman</div>
          <div className="mx-auto">Tunaa Technology</div>
          <div className="mx-auto">98000000000</div>
        </div>

        <div className="flex flex-col items-center  space-y-4 p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto ">
          <div className="text-xl font-semibold text-gray-800">
            Want to know what we are up to?
          </div>
          <div className="text-sm text-gray-600">
            Subscribe and join our tribe
          </div>
          <div className="flex flex-col md:flex-row  w-full gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
            <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
