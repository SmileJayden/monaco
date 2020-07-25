import { JSZipObject } from 'jszip';

export interface FileType {
  name: string;
  id: string;
  content: string;
  extension: string;
}

export interface FolderType {
  name: string;
  id: string;
  isOpened?: boolean;
  childFiles: FileType[];
  childFolders: FolderType[];
}
