"use client"
import dynamic from "next/dynamic";

const TinyMCEEditor = dynamic(() => import("../components/TinyMCE"),{
    ssr: false
});

const Article = () => {
  const handleEditorChange = (content) => {
    console.log(content);
  };
  return (
    <div className="flex flex-row items-center justify-center m-8">

      <div>
      <h1 className="justify-center flex flex-col items-center">Welcome to Article Writing Editor Example</h1>
      <TinyMCEEditor onEditorChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default Article;



