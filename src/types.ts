import { JSZipObject } from 'jszip';

export interface FileType {
  name: string;
  file: JSZipObject;
  id: string;
}
