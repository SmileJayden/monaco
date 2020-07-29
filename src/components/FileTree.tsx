import React from 'react';
import styled from 'styled-components';
import FileBranch from '~/components/FileBranch';
import FolderBranch from '~/components/FolderBranch';
import { FileType, FolderType } from '~/types';

interface FileTreeProps {
  files: FileType[];
  folders: FolderType[];
  onClickFile: (file: FileType) => void;
  onClickFolder: (folder: FolderType) => void;
}

const FileTreeWrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 100px);
  width: 300px;
  overflow-y: auto;
  background-color: #252526;

  color: white;
  h2 {
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid black;
  }
`;

const FileTree: React.FC<FileTreeProps> = ({
  files,
  folders,
  onClickFile,
  onClickFolder,
}) => {
  return (
    <FileTreeWrapper>
      <h2>File Tree</h2>
      <div className={'branch-container'}>
        {folders.map((folder: FolderType) => {
          return (
            <FolderBranch
              folder={folder}
              onClickFile={onClickFile}
              onClickFolder={onClickFolder}
              key={`folder-branch-${folder.id}`}
            />
          );
        })}
        {files.map((file: FileType) => {
          return (
            <FileBranch
              file={file}
              onClickFile={onClickFile}
              key={`file-branch-${file.id}`}
            />
          );
        })}
      </div>
    </FileTreeWrapper>
  );
};

export default FileTree;
