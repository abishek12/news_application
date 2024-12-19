import React from "react";
import Image from "next/image";

const Header = () => {
  // Function to format the date as "Mon 2024 December 16"
  const formatDate = () => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', options);
  };

  const currentDate = formatDate(); // Get the formatted date

  return (
    <div className="max-w-[1140px] mx-auto flex flex-col justify-center m-4 ">
      <Image
        src="/logo.svg"
        width={100}
        height={100}
        alt="Picture of the author"
        className="w-full max-w-[100px] p-6"
      />
      <div className="text-xl text-left mt-4 ml-6">
        {/* Display the formatted date */}
        {currentDate}
      </div>
    </div>
  );
};

export default Header;
