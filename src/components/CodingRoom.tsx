import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { FileType } from '~/types';

interface CodingRoomProps extends CodingRoomWrapperProps {
  file: FileType | null;
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
      await setTimeout(() => {}, 3000);
      let editorContent: string = 'const foo = () => 0;';
      await file?.zipObj
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
