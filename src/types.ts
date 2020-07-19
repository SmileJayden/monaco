import { JSZipObject } from 'jszip';

export interface FileType {
  name: string;
  content: string;
  isDir: boolean;
  id: string;
}
