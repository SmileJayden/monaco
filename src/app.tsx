import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/fp/debounce';
import cloneDeep from 'lodash/fp/cloneDeep';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import { encode } from 'js-base64';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
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
  readFilesRecursive,
  uploadZipFile,
} from '~/utils';

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
  const [zipFileName, setZipFileName] = useState<string>('');
  const [files, setFiles] = useState<FileType[]>([]);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [rootFolder, setRootFolder] = useState<FolderType | undefined>(
    undefined
  );
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileType | undefined>(
    undefined
  );

  const uploadFile = useCallback(async (e: File): Promise<void> => {
    const zipFile: File | undefined = e;

    if (zipFile) {
      setZipFileName(zipFile.name);
      setFiles([]);
      setFolders([]);
      setRootFolder(undefined);
      setOpenFiles([]);
      setSelectedFile(undefined);

      const rootFolder: FolderType = await uploadZipFile(zipFile);
      if (rootFolder) {
        setRootFolder(rootFolder);
        setFolders(rootFolder.childFolders);
        setFiles(rootFolder.childFiles);
      }
    }
  }, []);

  const handleDownLoadFile = useCallback((): void => {
    const zip = JSZip();

    if (rootFolder) {
      const res = readFilesRecursive(rootFolder);
      res.forEach((file) =>
        zip.file(file.name, file.content, { base64: true })
      );

      zip
        .generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
        })
        .then((content) => {
          FileSaver.saveAs(content, zipFileName);
          toast.info('download succeed ^^@');
        });
    } else {
      toast.warning('download failed');
    }
  }, [rootFolder]);

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
      <FileLoadHandler handleChangeFile={uploadFile} />
      <div className="program">
        <FileTree
          files={files}
          folders={folders}
          onClickFile={handleOnClickFile}
          onClickFolder={handleOnClickFolder}
          onClickDownload={handleDownLoadFile}
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
                  className={classNames('coding-room', {
                    'coding-room-selected': openFile.id === selectedFile?.id,
                  })}
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
