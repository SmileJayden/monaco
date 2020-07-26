import React, { memo } from 'react';
import styled from 'styled-components';
import FileBranch from '~/components/FileBranch';
import { FileType, FolderType } from '~/types';

interface FolderBranchProps {
  folder: FolderType;
  onClickFolder: (folder: FolderType) => void;
  onClickFile: (file: FileType) => void;
}

const FolderBranchWrapper = styled.div`
  background-color: #03009c;
  p {
    padding: 10px;
    cursor: pointer;
    overflow-x: auto;
  }
  &:hover {
    background-color: #03fcf0;
  }
`;

const FolderBranch: React.FC<FolderBranchProps> = ({
  folder,
  onClickFolder,
  onClickFile,
}) => {
  return (
    <>
      <FolderBranchWrapper>
        <p onClick={(e) => onClickFolder(folder)}>
          {'>'.repeat(folder.depth)}
          {folder.displayName}
        </p>
      </FolderBranchWrapper>
      {folder.isOpened && (
        <>
          {folder.childFolders.map((childFolder: FolderType) => (
            <FolderBranch
              folder={childFolder}
              onClickFolder={onClickFolder}
              onClickFile={onClickFile}
              key={`folder-branch-${folder.id}`}
            />
          ))}
          {folder.childFiles.map((childFile: FileType) => (
            <FileBranch file={childFile} onClickFile={onClickFile} />
          ))}
        </>
      )}
    </>
  );
};

const MemoizedFolderBranch = memo(FolderBranch);

export default MemoizedFolderBranch;
