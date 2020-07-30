import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import {
  IFileWithMeta,
  IPreviewProps,
} from 'react-dropzone-uploader/dist/Dropzone';
import 'react-dropzone-uploader/dist/styles.css';
import styled from 'styled-components';
import closeBtn from '~/assets/svg/close.svg';

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

const Preview = ({
  meta,
  fileWithMeta,
  isUpload,
  canCancel,
  canRemove,
  canRestart,
}: IPreviewProps) => {
  const { name, status } = meta;
  const handleClick = () => {
    fileWithMeta.remove();
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: '0',
        left: '0',
        bottom: '0',
        top: '0',
        cursor: 'pointer',
      }}
    >
      <p>
        <span
          style={{
            padding: '0 10px',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          {name}
        </span>
        <span>{status === 'done' ? 'is opened' : 'is opening...'}</span>
      </p>
      <img
        style={{
          marginLeft: '20px',
        }}
        className="button"
        width="30"
        height="30"
        onClick={handleClick}
        src={closeBtn}
        alt="closeBtn"
      />
    </div>
  );
};

const FileLoadHandler: React.FC<FileLoadHandlerProps> = ({
  handleChangeFile,
}) => {
  return (
    <FileLoadHandlerWrapper>
      <Dropzone
        inputContent="Plz input ZIP file"
        onChangeStatus={(e: IFileWithMeta) => handleChangeFile(e.file)}
        PreviewComponent={Preview}
        maxFiles={1}
        multiple={false}
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
