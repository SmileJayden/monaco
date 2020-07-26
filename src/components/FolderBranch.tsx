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
  isCollapsed: boolean;
  depth: number;
}

const FolderBranchWrapper = styled.div<FolderBranchWrapperProps>`
  background-color: #03009c;
  p {
    padding: 10px 10px 10px 0;
    margin-left: ${(props) => props.depth * 20}px;
    cursor: pointer;
    overflow-x: auto;

    &::before {
      content: ${(props) => (props.isCollapsed ? "'▶'" : "'▼'")};
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
  console.log('folder name', folder.name, 'rerender');
  return (
    <>
      <FolderBranchWrapper
        isCollapsed={folder.isCollapsed}
        depth={folder.depth}
      >
        <p onClick={(e) => onClickFolder(folder)}>{folder.displayName}</p>
      </FolderBranchWrapper>
      {!folder.isCollapsed && (
        <>
          {folder.childFolders.map((childFolder: FolderType) => (
            <FolderBranch
              folder={childFolder}
              onClickFolder={onClickFolder}
              onClickFile={onClickFile}
              key={`folder-branch-${childFolder.id}`}
            />
          ))}
          {folder.childFiles.map((childFile: FileType) => (
            <FileBranch
              file={childFile}
              onClickFile={onClickFile}
              key={`file-branch-${childFile.id}`}
            />
          ))}
        </>
      )}
    </>
  );
};

const MemoizedFolderBranch = memo(FolderBranch);

export default MemoizedFolderBranch;
