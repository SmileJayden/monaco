import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { JSZipObject } from 'jszip';

interface CodingRoomProps extends CodingRoomWrapperProps {
  file: JSZipObject | null;
}

interface CodingRoomWrapperProps {
  minHeight: number;
  minWidth: number;
}

const CodingRoomWrapper = styled.div<CodingRoomWrapperProps>`
  height: ${(props) => props.minHeight}px;
  min-width: ${(props) => props.minWidth}px;
`;

const CodingRoom: React.FC<CodingRoomProps> = ({
  minHeight,
  minWidth,
  file,
}) => {
  const monacoEditorRef = useRef<HTMLDivElement>(null);
  let monacoEditor: IStandaloneCodeEditor | null = null;

  useEffect(() => {
    (async function setEditorContent() {
      let editorContent: string = 'const foo = () => 0;';
      await file
        ?.async('string')
        .then((content) => {
          editorContent = content;
        })
        .catch((err) => {
          throw new Error(err);
        });

      if (monacoEditorRef.current) {
        monacoEditor = monaco.editor.create(monacoEditorRef.current, {
          value: editorContent,
          language: 'javascript',
          theme: 'vs-dark',
        });
      }
    })();

    return () => {
      monacoEditor && monacoEditor?.dispose();
    };
  }, [file]);

  return (
    <CodingRoomWrapper
      ref={monacoEditorRef}
      minHeight={minHeight}
      minWidth={minWidth}
      id="monaco-editor"
    />
  );
};

export default CodingRoom;
