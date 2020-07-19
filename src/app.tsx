import React, { ChangeEvent, useCallback, useState } from 'react';
import '~/assets/css/main.css';
import {} from 'styled-components/cssprop';
import styled from 'styled-components';
import JSZip, { JSZipObject } from 'jszip';
import { v4 as uuid } from 'uuid';
import FileLoadHandler from '~/components/FileLoadHandler';
import FileTree from '~/components/FileTree';
import Tabs from '~/components/Tabs';
import CodingRoom from '~/components/CodingRoom';
import { FileType } from '~/types';
import { getFileExtension, getIsEditable } from '~/utils';
import FileSaver from 'file-saver';

const AppWrapper = styled.div`
  position: relative;

  .program {
    display: flex;
    flex-direction: row;

    .editor {
      flex: 1;
      display: flex;
      flex-direction: column;
      .coding-room-container {
        background-color: #333333;
        position: relative;
        flex: 1;
        .coding-room {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
        .coding-room-selected {
          z-index: 999;
        }
      }
    }
  }
`;

const App = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileType | undefined>(
    undefined
  );

  const uploadFile = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const zipFiles = e.target.files;
    if (zipFiles && zipFiles.length > 0) {
      setFiles([]);
      setOpenFiles([]);
      setSelectedFile(undefined);
      for (let i = 0; i < zipFiles.length; i++) {
        JSZip.loadAsync(zipFiles[i])
          .then((zip) => {
            zip.forEach((relativePath, file: JSZipObject) => {
              // TODO: calibrate binarystring, string , .md file .. extra
              file.async('binarystring').then((content) => {
                setFiles((prevState: FileType[]) => [
                  ...prevState,
                  {
                    isDir: file.dir,
                    isEditable: getIsEditable(getFileExtension(file.name)),
                    name: file.name,
                    id: uuid(),
                    content,
                  },
                ]);
              });
            });
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    }
  }, []);

  const handleDownLoadFile = (): void => {
    console.log(files);
    // const zip = JSZip();
    // zip.file('Hello.tsx', 'Hello world\n');
    // zip.file('Hello1.txt', 'Hello world\n');
    // zip.file('Hello3.js', 'Hello woasdfrld\n');
    // zip.file('Hello3.txt', 'Hello worasdfld\n');
    // zip.file('Hello4.ts', 'Hello worasdfasdffld\n');
    // zip.file('ttt/Hello4.txt', 'Hello woadsfrasdfasdffld\n');
    // zip.folder('folder_1/');
    // zip.file('folder_1/folder1test.txt', 'Hello woadsfrasdfasdffld\n');
    // zip.folder('folder_23/askdjf/sadghdk/');
    // zip.folder('folder_yesslash/');
    // zip.folder('folder_noslash');
    //
    // zip
    //   .generateAsync({ type: 'blob' })
    //   .then((blob) => {
    //     FileSaver.saveAs(blob, 'hello.zip');
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
  };

  const handleOnClickFile = (file: FileType): void => {
    if (!openFiles.some((f) => f.id === file.id))
      setOpenFiles((prevState: FileType[]) => [...prevState, file]);
    setSelectedFile(file);
  };

  const handleCloseFile = (file: FileType): void => {
    if (selectedFile && file.id === selectedFile.id) {
      const closedFileIndex = openFiles.findIndex((f) => f.id === file.id);
      const updatedSelectedFile =
        openFiles[closedFileIndex > 0 ? closedFileIndex - 1 : 1];
      setSelectedFile(updatedSelectedFile);
    }
    setOpenFiles((prevState: FileType[]) =>
      prevState.filter((f) => f.id !== file.id)
    );
  };

  return (
    <AppWrapper>
      <FileLoadHandler
        handleChangeFile={uploadFile}
        handleClickBtn={handleDownLoadFile}
      />
      <div className="program">
        <FileTree
          files={files.filter((file) => !file.isDir)}
          onClickFile={handleOnClickFile}
        />
        <div className="editor">
          <Tabs
            selectedFileId={selectedFile?.id}
            files={openFiles}
            onClickFileTap={handleOnClickFile}
            onClickBtn={handleCloseFile}
          />
          <div className="coding-room-container">
            {openFiles.map((openFile) => {
              return (
                <div
                  className={`coding-room ${
                    openFile.id === selectedFile?.id
                      ? 'coding-room-selected'
                      : ''
                  }`}
                  key={`coding-room-${openFile.id}`}
                >
                  <CodingRoom file={openFile} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};
export default App;
