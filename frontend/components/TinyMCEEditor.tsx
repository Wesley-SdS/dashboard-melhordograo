import React, { useRef } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyMCEEditorComponent: React.FC<TinyMCEEditorProps> = ({
  value,
  onChange
}) => {
  // Use `any` for the editor reference to bypass TypeScript issues
  const editorRef = useRef<any>(null);

  return (
    <TinyMCEEditor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
};

export default TinyMCEEditorComponent;
