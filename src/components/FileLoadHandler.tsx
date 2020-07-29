import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import { IFileWithMeta } from 'react-dropzone-uploader/dist/Dropzone';

import styled from 'styled-components';
import 'react-dropzone-uploader/dist/styles.css';

interface FileLoadHandlerProps {
  handleChangeFile: (e: File) => void;
}

const FileLoadHandlerWrapper = styled.div`
  box-sizing: border-box;
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 140px;
  padding: 10px;
`;

const FileLoadHandler: React.FC<FileLoadHandlerProps> = ({
  handleChangeFile,
}) => {
  return (
    <FileLoadHandlerWrapper>
      <Dropzone
        inputContent="Plz input ZIP file"
        onChangeStatus={(e: IFileWithMeta) => handleChangeFile(e.file)}
        maxFiles={1}
        multiple={false}
        canCancel={true}
        styles={{
          dropzone: { width: 400, height: 10 },
        }}
        accept=".zip"
      />
    </FileLoadHandlerWrapper>
  );
};

const MemoizedFileLoadHandler = React.memo(FileLoadHandler);

export default MemoizedFileLoadHandler;
