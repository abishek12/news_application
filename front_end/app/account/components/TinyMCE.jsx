// components/TinyMCEEditor.js
"use client";

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import "../../../envConfig";

const TinyMCEEditor = ({ onEditorChange, height = 500, width = 800 }) => {
  const editorRef = useRef();
  const apikey = "gcbz35x98k6mthtwve5tu1ja6xkqiccb0e9u10267k071h1v";
  console.log("apikey", apikey);
  return (
    <Editor
      apiKey={apikey}
      initialValue="<p>This is the initial content of the editor.</p>"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: height,
        width: width,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
          "template",
          "codesample",
        ],
        selector: "textarea#default",
        toolbar:
          "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
          "bullist numlist outdent indent | link image | print preview media fullscreen | " +
          "forecolor backcolor emoticons",

        menubar: "file edit view insert format tools table",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyMCEEditor;
