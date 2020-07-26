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
  isCollapsed: boolean;
  childFiles: FileType[];
  childFolders: FolderType[];
  depth: number;
}

export interface readFileType {
  name: string;
  content: string;
}
