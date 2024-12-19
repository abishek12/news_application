import React from "react";
import Image from "next/image";
import Comments from "../../components/Comments";

const NewsDetailPage = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/news/${id}`);

  if (!res.ok) {
    return <div>Article not found</div>;
  }

  const article = await res.json();

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center mb-4">
          <span className="mr-4">By {article.author}</span>
          <span className="ml-4">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>

        {article.source?.name && (
          <div className="text-sm text-gray-500 mb-4">
            Source: <span className="font-semibold">{article.source.name}</span>
          </div>
        )}

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        )}

        <div className="prose my-6">
          <p>{article.description}</p>
          <p>{article.content}</p>
        </div>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Read the original article
          </a>
        )}

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <Comments />
    </div>
  );
};

export default NewsDetailPage;
