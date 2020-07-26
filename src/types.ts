export interface FileType {
  name: string;
  displayName: string;
  id: string;
  content: string;
  extension: string;
  depth: number;
}

export interface FolderType {
  name: string;
  displayName: string;
  id: string;
  isOpened: boolean;
  childFiles: FileType[];
  childFolders: FolderType[];
  depth: number;
}
