import { JSZipObject } from 'jszip';

export interface FileType {
  name: string;
  content: string;
  isDir: boolean;
  isEditable: boolean;
  id: string;
}
