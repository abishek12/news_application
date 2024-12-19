import React from "react";
import Card from "./Card";

const Sports = ({ data }) => {
  const articles = data.slice(0, 8); // Fetch first 8 articles

  return (
    <div className="max-w-[1140px] mx-auto p-4 bg-white my-6 rounded-xl">
      {/* Title Section */}
      <div className="flex items-start justify-between">
        <h2 className="text-3xl font-bold text-left text-gray-900 mb-6">
          Sports News
        </h2>
        <button className="bg-[#0450A4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View all
        </button>
      </div>

      {/* Articles Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <Card article={article} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sports;
