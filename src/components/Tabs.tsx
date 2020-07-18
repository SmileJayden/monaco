import React from 'react';
import styled from 'styled-components';
import { FileType } from '~/types';

interface TabsProps {
  files: FileType[];
  onClickFileTap: (file: FileType) => void;
  selectedFileId: string | undefined;
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

  p {
    margin: 0 10px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: dimgrey;
    }
  }
`;

const Tabs: React.FC<TabsProps> = ({ files, onClickFileTap }) => {
  return (
    <TabsWrapper>
      {files.map((file: FileType) => (
        <p onClick={() => onClickFileTap(file)} key={`tap-${file.id}`}>
          {file.name}
        </p>
      ))}
    </TabsWrapper>
  );
};

export default Tabs;
