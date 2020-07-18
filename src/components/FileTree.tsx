import React from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';
import { JSZipObject } from 'jszip';

interface FileTreeProps {
  files: FileType[];
  onClickFile: (file: JSZipObject) => void;
}

const FileTreeWrapper = styled.div`
  width: 900px;
`;

const FileTree: React.FC<FileTreeProps> = ({ files, onClickFile }) => {
  return (
    <FileTreeWrapper>
      {files.map((file: FileType) => {
        return (
          <p key={file.id} onClick={(e) => onClickFile(file.file)}>
            {file.name}
          </p>
        );
      })}
    </FileTreeWrapper>
  );
};

export default FileTree;
