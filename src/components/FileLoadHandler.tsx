import React, { ChangeEvent, ReactEventHandler } from 'react';
import styled from 'styled-components';

interface FileLoadHandlerProps {
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileLoadHandlerWrapper = styled.div`
  background-color: cadetblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 10px;
`;

const FileLoadHandler: React.FC<FileLoadHandlerProps> = ({
  handleChangeFile,
}) => {
  return (
    <FileLoadHandlerWrapper>
      <input type="file" multiple onChange={(e) => handleChangeFile(e)} />
    </FileLoadHandlerWrapper>
  );
};

export default FileLoadHandler;
