import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FileType, FolderType } from '~/types';
import FileBranch from '~/components/FileBranch';
import FolderBranch from '~/components/FolderBranch';

interface FileTreeProps {
  files: FileType[];
  folders: FolderType[];
  onClickFile: (file: FileType) => void;
}

const FileTreeWrapper = styled.div`
  height: 500px;
  width: 300px;
  overflow-y: auto;
  background-color: cornflowerblue;
  color: white;
  h2 {
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid royalblue;
  }
`;

const FileTree: React.FC<FileTreeProps> = ({ files, folders, onClickFile }) => {
  const handleOnClickFolder = useCallback(() => {
    console.log('handleOnClickFolder');
  }, []);

  return (
    <FileTreeWrapper>
      <h2>File Tree</h2>
      <div className={'branch-container'}>
        {folders.map((folder: FolderType) => {
          return (
            <FolderBranch
              folder={folder}
              onClickFolder={handleOnClickFolder}
              onClickFile={onClickFile}
            />
          );
        })}
        {files.map((file: FileType) => {
          return <FileBranch file={file} onClickFile={onClickFile} />;
        })}
      </div>
    </FileTreeWrapper>
  );
};

export default FileTree;
