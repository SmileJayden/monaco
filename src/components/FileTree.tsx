import React from 'react';
import styled from 'styled-components';
import { FileType, FolderType } from '~/types';
import FileBranch from '~/components/FileBranch';
import FolderBranch from '~/components/FolderBranch';

interface FileTreeProps {
  files: FileType[];
  folders: FolderType[];
  onClickFile: (file: FileType) => void;
  onClickFolder: (folder: FolderType) => void;
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

const FileTree: React.FC<FileTreeProps> = ({
  files,
  folders,
  onClickFile,
  onClickFolder,
}) => {
  console.log('FileTree rerender');
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
