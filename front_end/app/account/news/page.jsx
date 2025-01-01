"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/v1/posts");
        if (response.ok) {
          const data = await response.json();
          setNews(data);
          console.log(data);
          //   console.log(news);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchNews();
  }, []);
  console.log("News data:", news);

  // calculate indices for pagination
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  //   const showNews = news.slice(1,9)

  const totalPages = Math.ceil(news.length / postPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentPosts.map((article, index) => (
            <Card key={index} article={article} index={index} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 mb-1 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-400 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-400 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default News;

{/* bg-blue-700*/}
