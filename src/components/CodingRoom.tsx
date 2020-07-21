import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { FileType } from '~/types';
import { getFileExtension } from '~/utils';
import { decode } from 'js-base64';

interface CodingRoomProps {
  file: FileType;
  change: (e: string) => void;
}

interface CodingRoomWrapperProps {
  editable: boolean;
}

const CodingRoomWrapper = styled.div<CodingRoomWrapperProps>`
  background-color: #333333;
  display: ${(props) => (props.editable ? 'block' : 'flex')};

  &,
  #monaco-editor {
    height: 100%;
  }
  img {
    color: white;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const getEditorLang = (fileExtension: string | undefined): string => {
  if (!fileExtension) return '';
  switch (fileExtension) {
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

const CodingRoom: React.FC<CodingRoomProps> = ({ file, change }) => {
  const monacoEditorRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  let monacoEditor: IStandaloneCodeEditor | null = null;

  useEffect(() => {
    const resize = () => {
      if (monacoEditor) {
        monacoEditor.layout({ height: 0, width: 0 });
        monacoEditor.layout();
      }
    };
    window.addEventListener('resize', resize);
    setTimeout(() => resize); // push to next tick
    return () => window.removeEventListener('resize', resize);
  });

  useEffect(() => {
    if (monacoEditorRef.current) {
      monacoEditor = monaco.editor.create(monacoEditorRef.current, {
        value: decode(file.content),
        language: getEditorLang(getFileExtension(file.name)),
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

    monacoEditor?.onDidChangeModelContent(() => {
      if (monacoEditor && change) change(monacoEditor.getValue());
    });

    if (file && file.content && imgRef.current) {
      imgRef.current.src = 'data:image;base64,' + file.content;
    }

    return () => {
      // https://github.com/microsoft/monaco-editor/issues/1842#issuecomment-616290623
      monacoEditor && monacoEditor?.dispose();
    };
  }, [file]);

  return (
    <CodingRoomWrapper editable={file.isEditable}>
      {file.isEditable ? (
        <div ref={monacoEditorRef} id="monaco-editor" />
      ) : (
        <img ref={imgRef} alt={'This is not editable'} />
      )}
    </CodingRoomWrapper>
  );
};

const MemoizedCodingRoom = memo(CodingRoom);

export default MemoizedCodingRoom;
