import React, { ChangeEvent, useState } from 'react';
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

const AppWrapper = styled.div`
  position: relative;

  .program {
    display: flex;
    flex-direction: row;

    .editor {
      flex: 1;
    }
  }
`;

const App = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [selectedFile, setSelectedFile] = useState<JSZipObject | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files)
      for (let i = 0; i < files.length; i++) {
        JSZip.loadAsync(files[i])
          .then((zip) => {
            zip.forEach((relativePath, file: JSZipObject) => {
              setFiles((prevState: FileType[]) => [
                ...prevState,
                { name: file.name, file: file, id: uuid() },
              ]);
            });
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
  };

  const handleOnClickFile = (file: JSZipObject) => {
    setSelectedFile((prevState) => file);
  };

  return (
    <AppWrapper>
      <FileLoadHandler handleChangeFile={handleChangeFile} />
      <div className="program">
        <FileTree files={files} onClickFile={handleOnClickFile} />
        <div className="editor">
          <Tabs />
          <CodingRoom file={selectedFile} minHeight={500} minWidth={750} />
        </div>
      </div>
    </AppWrapper>
  );
};
export default App;
