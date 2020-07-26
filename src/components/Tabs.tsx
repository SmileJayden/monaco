import React from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';

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
    margin: 0 10px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    &:hover {
      background-color: dimgrey;
    }
    &.selected {
      cursor: initial;
      background-color: darkgoldenrod;
    }
    button {
      cursor: pointer;
      min-width: 50px;
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
          <p onClick={() => onClickFileTap(file)}>{file.name}</p>
          <button onClick={() => onClickBtn(file)}>닫기</button>
        </div>
      ))}
    </TabsWrapper>
  );
};

const MemoizedTabs = React.memo(Tabs);

export default MemoizedTabs;
