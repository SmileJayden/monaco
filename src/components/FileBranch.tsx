import React, { memo } from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';

interface FileBranchProps {
  file: FileType;
  onClickFile: (file: FileType) => void;
}

const FileBranchWrapper = styled.div`
  background-color: #0356fc;
  p {
    padding: 10px;
    cursor: pointer;
  }
  &:hover {
    background-color: #03fcf0;
  }
`;

const FileBranch: React.FC<FileBranchProps> = ({ file, onClickFile }) => {
  return (
    <FileBranchWrapper>
      <p key={`file-branch-${file!.id}`} onClick={(e) => onClickFile(file!)}>
        {file!.name}
      </p>
    </FileBranchWrapper>
  );
};

const MemoizedFileBranch = memo(FileBranch);

export default MemoizedFileBranch;
