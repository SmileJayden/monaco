import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { FileType } from '~/types';

interface CodingRoomProps extends CodingRoomWrapperProps {
  file: FileType | undefined;
}

interface CodingRoomWrapperProps {
  minHeight: number;
  minWidth: number;
}

const CodingRoomWrapper = styled.div<CodingRoomWrapperProps>`
  height: ${(props) => props.minHeight}px;
  min-width: ${(props) => props.minWidth}px;
`;

const getEditorLang = (fileName: string | undefined): string => {
  if (!fileName) return '';
  const extension = fileName!.split('.').pop();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'text/css';
    case 'scss':
      return 'text/scss';
    case 'html':
      return 'text/html';
    case 'py':
      return 'python';
    default:
      return '';
  }
};

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
        language: getEditorLang(file?.name),
        theme: 'vs-dark',
        scrollBeyondLastLine: false,
      });
    }

    monacoEditor?.addAction({
      id: 'monaco-redo',
      label: 'editor redo',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R],
      run(editor: editor.ICodeEditor, ...args): void | Promise<void> {
        editor.trigger('', 'redo', '');
        return;
      },
    });

    return () => {
      // https://github.com/microsoft/monaco-editor/issues/1842#issuecomment-616290623
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
