import React from 'react';
import styled from 'styled-components';
import FileBranch from '~/components/FileBranch';
import FolderBranch from '~/components/FolderBranch';
import download from '~/assets/svg/download.svg';
import { FileType, FolderType } from '~/types';
import closeBtn from '~/assets/svg/close.svg';

interface FileTreeProps {
  files: FileType[];
  folders: FolderType[];
  onClickFile: (file: FileType) => void;
  onClickFolder: (folder: FolderType) => void;
  onClickDownload: () => void;
}

const FileTreeWrapper = styled.div`
  width: 300px;

  background-color: #252526;
  color: white;

  .header {
    box-sizing: border-box;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 0 10px;
    h2 {
      font-size: 20px;
    }
    .button-wrapper {
      margin-left: auto;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: grey;
      width: 36px;
      height: 36px;
      border-radius: 18px;
      img {
        width: 24px;
        height: 24px;
      }
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
  .branch-container {
    height: calc(100vh - 190px);
    overflow-y: auto;
  }
`;

const FileTree: React.FC<FileTreeProps> = ({
  files,
  folders,
  onClickFile,
  onClickFolder,
  onClickDownload,
}) => {
  return (
    <FileTreeWrapper>
      <div className="header">
        <h2>File Tree</h2>
        <div className="button-wrapper">
          <img
            className="button"
            onClick={onClickDownload}
            src={download}
            alt="download"
          />
        </div>
      </div>
      <div className="branch-container">
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
