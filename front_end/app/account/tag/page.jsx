"use client";
import React, { useState } from "react";

const Tag = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Adding category with data:", formData);
      const response = await fetch("http://localhost:9999/api/v1/tags", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Added new tag successfully:", data);
        alert("Tag add successful!");
        setFormData((formData) => ({
          ...formData,

          title: "",
        }));
      } else {
        console.error("Adding tag failed:", data);
        alert("Tag add failed");
      }
    } catch (error) {
      console.error("Detailed Network Error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      alert("Unable to connect to server. Please check your connection.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-200 rounded-md m-32 ">
      <h1 className="flex items-center justify-center text-lg">Add Tag</h1>
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
        {/*Title*/}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tag;
