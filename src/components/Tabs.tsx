import React from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';
import closeBtn from '~/assets/svg/close.svg';

interface TabsProps {
  files: FileType[];
  selectedFileId: string | undefined;
  onClickFileTap: (file: FileType) => void;
  onClickBtn: (file: FileType) => void;
}

const TabsWrapper = styled.div`
  background-color: #131313;
  color: white;
  width: calc(100vw - 300px);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  border-bottom: 1px solid dimgrey;

  .tab {
    margin: 5px 5px 0;
    max-height: 40px;
    min-height: 40px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
      background-color: #cccccc;
    }
    &.selected {
      cursor: initial;
      background-color: dimgray;
    }
    p {
      max-width: 200px;
      white-space: nowrap;
      overflow-x: auto;
      height: 28px;
      line-height: 28px;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 20px;
      margin-left: 4px;
      &:hover {
        background-color: whitesmoke;
      }
    }
  }
`;

const Tabs: React.FC<TabsProps> = ({
  files,
  selectedFileId,
  onClickFileTap,
  onClickBtn,
}) => {
  return (
    <TabsWrapper>
      {files.map((file: FileType) => (
        <div
          key={`tap-${file.id}`}
          className={`tab ${file.id === selectedFileId ? 'selected' : ''}`}
        >
          <p onClick={() => onClickFileTap(file)}>{file.displayName}</p>
          <img
            className="button"
            onClick={() => onClickBtn(file)}
            src={closeBtn}
            alt="closeBtn"
          />
        </div>
      ))}
    </TabsWrapper>
  );
};

const MemoizedTabs = React.memo(Tabs);

export default MemoizedTabs;
