"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// CSS imports (safe for top-level)
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// Dynamic import for SSR safe
const FroalaEditor = dynamic(
  () => import("react-froala-wysiwyg"),
  { ssr: false }
);

const RichTextEditor = ({ value, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    // Only run in browser
    import("froala-editor/js/plugins.pkgd.min.js").then(() => {
      setEditorLoaded(true);
    });
  }, []);

  if (!editorLoaded) return <div>Loading editor...</div>;

  return (
    <div className="fr-view">
      <h3 className="mt-4 mb-2">Enter brief detail about your project</h3>
      <FroalaEditor
        tag="textarea"
        model={value}
        onModelChange={onChange}
        config={{
          placeholderText: "Type your content here...",
          toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "formatUL",
            "formatOL",
            "insertLink",
            "insertImage",
            "undo",
            "redo",
          ],
          heightMin: 300,
          listAdvancedTypes: true,
        }}
      />
    </div>
  );
};

export default RichTextEditor;
