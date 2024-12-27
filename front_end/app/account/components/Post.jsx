"use client";

import React, { useState, useEffect } from "react";
import "dotenv";
import slug from "slug";
import { jwtDecode } from "jwt-decode";
import Fuse from "fuse.js";
import getToken from ''

const Post = () => {
  const [formData, setFormData] = useState({
    title: "",
    slugs: "",
    category: "",
    tags: [],
    author: "",
    images: "",
    description: "",
    content: "",
    status: ["draft", "published"],
    visibility: ["public", "private"],
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [userId, setUserId] = useState(null);

  // const token = getAuthStatus()
  // console.log(token)
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      console.log("token: ", token.value);
      const decoded = jwtDecode(token.value);
      console.log(decoded.data["id"]);
      setFormData((formData) => ({
        ...formData,
        author: decoded.data["id"],
      }));
      // setUserId(decoded.data["id"]);
      // setUserId(token)
    };
    checkAuth();
  }, []);

  // console.log(token.value)
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/v1/category");
        if (response.ok) {
          const data = await response.json();
          setCategoryOptions(data.items);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/v1/tags");
        if (response.ok) {
          const data = await response.json();
          setTagOptions(data.items);
          console.log(data);
          // console.log(tagOptions)
        } else {
          console.error("Error fetching tags:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTagSearch = (e) => {
    const input = e.target.value;
    setTagSearch(input);

    if (input) {
      const fuse = new Fuse(tagOptions, { keys: ["title"], threshold: 0.3 });
      const results = fuse.search(input).map((result) => result.item);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag._id)) {
      setFormData((formData) => ({
        ...formData,
        tags: [...formData.tags, tag._id],
      }));
    }
    setTagSearch(""); // Clear search input
    setSuggestions([]); // Clear suggestions
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,

      // Automatically generate slug when title changes
      ...(name === "title" ? { slugs: slug(value) } : {}),
    }));
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;

    if (!formData.tags.includes(selectedTag)) {
      setFormData((formData) => ({
        ...formData,
        tags: [...formData.tags, selectedTag],
      }));
    }
    setTagSearch("");
    setSuggestions([]);
  };

  const removeTag = (tagToRemove) => {
    setFormData((formData) => ({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.category || formData.tags.length === 0) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Adding new post with data", formData);
      const response = await fetch("http://localhost:9999/api/v1/posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      console.log("Raw Response:", response);
      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        console.log("Added post successfully:", data);
        alert("Post add successful!");
        setFormData((formData) => ({
          ...formData,
          content: "",
          title: "",
          category: "",
          tags: [],
          description: "",
          images: "",
        }));
      } else {
        console.error("Adding post failed:", data);
        alert("Post add failed");
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
    <>
      <div className="max-w-2xl mx-auto p-6 bg-blue-200 rounded-md m-2">
        <h1 className="flex items-center justify-center text-lg ">New Post</h1>
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
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
              value={formData.title}
              required
              onChange={handleChange}
            />
          </div>

          {/*Category */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              <option value="" disabled>
                Select an option
              </option>

              {categoryOptions.map((value, index) => (
                <option value={value._id} key={index}>
                  {value.title}
                </option>
              ))}
            </select>
          </div>

          {/**Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              value={tagSearch}
              onChange={handleTagSearch}
              placeholder="Search tags..."
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg bg-white">
                {suggestions.map((tag) => (
                  <li
                    key={tag._id}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => addTag(tag)}
                  >
                    {tag.title}
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tagId, index) => {
                const selectedTag = tagOptions.find((tag) => tag._id === tagId);
                return (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="mr-2">
                      {selectedTag?.title || "Unknown Tag"}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeTag(tagId)}
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Tags */}
          {/* <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <select
              name="tags"
              value=""
              onChange={handleTagChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              <option value="" disabled>
                Select tags
              </option>
              {tagOptions.map((tag, index) => (
                <option value={tag._id} key={index}>
                  {tag.title}
                </option>
              ))}
            </select> */}

            {/*Selected Tags*/}
            {/* <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tagId, index) => {
                const selectedTag = tagOptions.find((tag) => tag._id === tagId);

                return (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="mr-2">
                      {selectedTag?.title || "Unknown Tag"}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeTag(tagId)}
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          </div> */}

          {/*Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              // accept="image/*"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={3}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>

          {/* Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-2 space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  // checked={formData.status === "draft"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                  defaultChecked
                />
                <span className="ml-2">Draft</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Published</span>
              </label>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visibility
            </label>
            <div className="mt-2 space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  // checked={formData.visibility === "public"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                  defaultChecked
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
