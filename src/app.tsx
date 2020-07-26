import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/fp/debounce';
import cloneDeep from 'lodash/fp/cloneDeep';
import { ToastContainer, toast } from 'react-toastify';
import FileLoadHandler from '~/components/FileLoadHandler';
import FileTree from '~/components/FileTree';
import Tabs from '~/components/Tabs';
import CodingRoom from '~/components/CodingRoom';
import { FileType, FolderType } from '~/types';
import {
  findTargetFile,
  findTargetFolder,
  getIsViewable,
  uploadZipFile,
} from '~/utils';
import { v4 as uuid } from 'uuid';
import { encode } from 'js-base64';

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
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [rootFolder, setRootFolder] = useState<FolderType | undefined>(
    undefined
  );
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileType | undefined>(
    undefined
  );

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const zipFile: File | undefined = e.target.files?.[0];

      if (zipFile) {
        const rootFolder: FolderType = await uploadZipFile(zipFile);
        if (rootFolder) {
          setRootFolder(rootFolder);
          setFolders(rootFolder.childFolders);
          setFiles(rootFolder.childFiles);
        }
      }
    },
    []
  );

  console.log('rerender app');

  const handleDownLoadFile = (): void => {
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

  const handleOnClickFolder = useCallback(
    (folder: FolderType) => {
      if (rootFolder) {
        const cloneFolders = cloneDeep(folders);
        const mockRootFolder: FolderType = {
          name: '/',
          displayName: '/',
          id: uuid(),
          isCollapsed: true,
          childFiles: [],
          childFolders: cloneFolders,
          depth: 0,
        };
        const targetFolder = findTargetFolder(mockRootFolder, folder.name);
        if (targetFolder) {
          targetFolder.isCollapsed = !targetFolder.isCollapsed;
        }
        setFolders(cloneFolders);

        setRootFolder((prevState: FolderType | undefined) => {
          if (prevState) {
            return {
              ...prevState,
              childFolders: cloneFolders,
            };
          }
          return undefined;
        });
      }
    },
    [folders]
  );

  const handleOnClickFile = useCallback(
    (file: FileType): void => {
      if (!getIsViewable(file)) {
        toast.warning('This file is not viewable');
        return;
      }
      if (!openFiles.some((f) => f.id === file.id))
        setOpenFiles((prevState: FileType[]): FileType[] => [
          ...prevState,
          file,
        ]);
      setSelectedFile(file);
    },
    [openFiles]
  );

  const handleCloseFile = useCallback(
    (file: FileType): void => {
      if (selectedFile && file.id === selectedFile.id) {
        const closedFileIndex = openFiles.findIndex((f) => f.id === file.id);
        const updatedSelectedFile =
          openFiles[closedFileIndex > 0 ? closedFileIndex - 1 : 1];
        setSelectedFile(updatedSelectedFile);
      }
      setOpenFiles((prevState: FileType[]) =>
        prevState.filter((f) => f.id !== file.id)
      );
      if (rootFolder) {
        setFolders(rootFolder.childFolders);
        setFiles(rootFolder.childFiles);
      }
    },
    [selectedFile, openFiles, rootFolder]
  );

  const handleChange = useCallback(
    debounce(
      500,
      (updatedContent: string, fileId: string, fileName: string) => {
        setRootFolder((prevState) => {
          const rootFolderClone: FolderType | undefined = cloneDeep(prevState);
          if (rootFolderClone) {
            const targetFile: FileType | undefined = findTargetFile(
              rootFolderClone,
              fileName,
              fileId
            );
            if (targetFile) targetFile.content = encode(updatedContent);
          }
          return rootFolderClone;
        });
        toast.info('content is saved ^^@');
      }
    ),
    []
  );

  return (
    <AppWrapper>
      <FileLoadHandler
        handleChangeFile={uploadFile}
        handleClickBtn={handleDownLoadFile}
      />
      <div className="program">
        <FileTree
          files={files}
          folders={folders}
          onClickFolder={handleOnClickFolder}
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
                  <CodingRoom file={openFile} change={handleChange} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </AppWrapper>
  );
};
export default App;
