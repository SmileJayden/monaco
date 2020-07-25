import { decode } from 'js-base64';
import { FileType, FolderType } from '~/types';
import JSZip, { JSZipObject } from 'jszip';
import { v4 as uuid } from 'uuid';

const getFileExtension = (fileName: string | undefined): string => {
  const res: string | undefined = fileName?.split('.').pop();
  return res ? res : '';
};

const getIsImg = (fileExtension: string): boolean => {
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'ico':
      return true;
    default:
      return false;
  }
};

const getIsDecodable = (content: string): boolean => {
  try {
    return !!decode(content);
  } catch {
    return false;
  }
};

const getIsViewable = (file: FileType): boolean => {
  return getIsDecodable(file.content) || getIsImg(file.extension);
};

const uploadZipFile = async (zipFiles: FileList): Promise<FolderType[]> => {
  const res: any[] = [];

  for (let i = 0; i < zipFiles.length; i++) {
    const loadedZip: JSZip = await JSZip.loadAsync(zipFiles[i]);
    console.dir(loadedZip.files);
    for (const [key, value] of Object.entries(loadedZip.files)) {
      console.log(`${key}: ${value}`);
      const res2 = await value.async('base64');
      console.log('res2', res2);
      if (value.dir)
        res.push({
          name: key,
          id: uuid(),
          childFiles: [],
          childFolders: [],
        });
    }
    // for (let j = 0; j < ; j++) {
    //
    // }
    // console.dir('loadedZip', JSON.stringify(loadedZip, null, 4));
    // loadedZip.files.map((x) => {
    //   console.log('loadedZip', x);
    // });
    // console.log('loadedZip', JSON.stringify(loadedZip, null, 4));
    // loadedZip.forEach(async (relativePath: string, file: JSZipObject) => {
    //   const fileGet = await file.async('base64');
    //   // console.log('fileGet', JSON.stringify(fileGet, null, 4));
    //   res.push(fileGet);
    // });
    // res.push(await JSZip.loadAsync(zipFiles[i]).then(((zip:JSZip) => {
    //   zip.forEach((relativePath:string, file: JSZipObject) => {
    //
    //   })
    // } )));
  }

  console.log('res', res);

  return res;
};

export {
  getFileExtension,
  getIsImg,
  getIsDecodable,
  getIsViewable,
  uploadZipFile,
};
