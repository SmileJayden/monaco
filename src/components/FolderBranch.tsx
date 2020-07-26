import React, { memo } from 'react';
import styled from 'styled-components';
import FileBranch from '~/components/FileBranch';
import { FileType, FolderType } from '~/types';

interface FolderBranchProps {
  folder: FolderType;
  onClickFolder: (folder: FolderType) => void;
  onClickFile: (file: FileType) => void;
}

interface FolderBranchWrapperProps {
  isOpened: boolean;
  depth: number;
}

const FolderBranchWrapper = styled.div<FolderBranchWrapperProps>`
  background-color: #03009c;
  p {
    padding: 10px 10px 10px ${(props) => props.depth * 10}px;
    cursor: pointer;
    overflow-x: auto;

    &::before {
      content: ${(props) => (props.isOpened ? "'▼'" : "'▶'")};
    }
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
      <FolderBranchWrapper isOpened={folder.isOpened} depth={folder.depth}>
        <p onClick={(e) => onClickFolder(folder)}>{folder.displayName}</p>
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
