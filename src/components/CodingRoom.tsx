import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface CodingRoomProps {
  minHeight: number;
  minWidth: number;
}

const MonacoEditorWrapper = styled.div<CodingRoomProps>`
  height: ${(props) => props.minHeight}px;
  min-width: ${(props) => props.minWidth}px;
`;

const CodingRoom: React.FC<CodingRoomProps> = ({ minHeight, minWidth }) => {
  const monacoEditorRef = useRef<HTMLDivElement>(null);
  let monacoEditor: IStandaloneCodeEditor | null = null;

  useEffect(() => {
    if (monacoEditorRef.current) {
      monacoEditor = monaco.editor.create(monacoEditorRef.current, {
        value: `const foo = () => 0;`,
        language: 'javascript',
        theme: 'vs-dark',
      });
    }
    return () => {
      monacoEditor && monacoEditor?.dispose();
    };
  }, []);

  return (
    <MonacoEditorWrapper
      ref={monacoEditorRef}
      minHeight={minHeight}
      minWidth={minWidth}
      id="monaco-editor"
    />
  );
};

export default CodingRoom;
