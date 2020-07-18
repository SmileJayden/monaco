import { JSZipObject } from 'jszip';

export interface FileType {
  name: string;
  zipObj: JSZipObject;
  id: string;
}
