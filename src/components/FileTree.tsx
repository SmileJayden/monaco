import React from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';

interface FileTreeProps {
  files: FileType[];
  onClickFile: (file: FileType) => void;
}

const FileTreeWrapper = styled.div`
  width: 300px;
  background-color: cornflowerblue;
  color: white;
  h2 {
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid royalblue;
  }
  .branch-container {
    height: 500px;
    overflow-y: auto;
    p {
      padding: 5px;
      cursor: pointer;
      &:hover {
        background-color: deepskyblue;
      }
    }
  }
`;

const FileTree: React.FC<FileTreeProps> = ({ files, onClickFile }) => {
  return (
    <FileTreeWrapper>
      <h2>File Tree</h2>
      <div className={'branch-container'}>
        {files.map((file: FileType) => {
          return (
            <p
              key={`file-branch-${file.id}`}
              onClick={(e) => onClickFile(file)}
            >
              {file.name}
            </p>
          );
        })}
      </div>
    </FileTreeWrapper>
  );
};

export default FileTree;
