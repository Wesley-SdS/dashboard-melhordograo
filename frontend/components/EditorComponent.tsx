import { FC } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface EditorComponentProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

export const EditorComponent: FC<EditorComponentProps> = ({
  editorState,
  setEditorState,
}) => {
  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="space-y-4">
      <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
        Descrição do Produto *
      </label>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName h-96 border"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
};
