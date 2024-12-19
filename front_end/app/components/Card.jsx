import Link from 'next/link';
import React from 'react';

const Card = ({ article, index }) => {
  // Helper function to truncate the description
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Link
      key={index}
      href={`/news/${article.source.id}`}
      target=""
      rel="noopener noreferrer"
      className="block shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
    >
      {/* Image */}
      <div className="h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={article.urlToImage || "https://via.placeholder.com/150"}
          alt={article.title || "News Image"}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-2">
          {article.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-700 border border-black rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-900 truncate">
          {article.title || "No title available"}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-snug">
          {truncateText(article.description || "Description not available.", 60)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
