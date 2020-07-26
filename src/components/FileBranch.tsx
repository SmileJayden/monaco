import React, { memo } from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';

interface FileBranchProps {
  file: FileType;
  onClickFile: (file: FileType) => void;
}

interface FileBranchWrapper {
  depth: number;
}

const FileBranchWrapper = styled.div<FileBranchWrapper>`
  background-color: #0356fc;
  p {
    padding: 10px 10px 10px 0;
    margin-left: ${(props) => props.depth * 20}px;
    cursor: pointer;
    overflow-x: auto;
  }
  &:hover {
    background-color: #03fcf0;
  }
`;

const FileBranch: React.FC<FileBranchProps> = ({ file, onClickFile }) => {
  return (
    <FileBranchWrapper depth={file.depth}>
      <p onClick={(e) => onClickFile(file!)}>{file!.displayName}</p>
    </FileBranchWrapper>
  );
};

const MemoizedFileBranch = memo(FileBranch);

export default MemoizedFileBranch;
