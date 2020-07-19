import React, { memo, useEffect, useRef } from 'react';
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
    if (monacoEditorRef.current) {
      monacoEditor = monaco.editor.create(monacoEditorRef.current, {
        value: file?.content,
        language: 'javascript',
        theme: 'vs-dark',
      });
    }

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

const MemoizedCodingRoom = memo(CodingRoom);

export default MemoizedCodingRoom;
