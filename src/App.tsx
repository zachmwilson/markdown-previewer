import { useEffect, useState } from "react";
import styled from "styled-components";

import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import { initialText } from "./markdown";

import "./App.css";

const AppBox = styled.div`
  width: 100%;
  height: var(--app-height);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  overflow: auto;
`;

const App = () => {
  const [editorFullSize, setEditorFullSize] = useState(false);
  const handleEditorFullSize = () => setEditorFullSize((prev) => !prev);
  const [previewFullSize, setPreviewFullSize] = useState(false);
  const handlePreviewFullSize = () => setPreviewFullSize((prev) => !prev);

  const [text, setText] = useState(initialText);

  const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", setAppHeight);
    setAppHeight();
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <main>
      <AppBox>
        <Editor
          editorFullSize={editorFullSize}
          previewFullSize={previewFullSize}
          handleEditorFullSize={handleEditorFullSize}
          text={text}
          setText={setText}
        />
        <Previewer
          editorFullSize={editorFullSize}
          previewFullSize={previewFullSize}
          handlePreviewFullSize={handlePreviewFullSize}
          text={text}
        />
      </AppBox>
    </main>
  );
};

export default App;
