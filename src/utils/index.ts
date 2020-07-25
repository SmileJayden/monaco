import { decode } from 'js-base64';
import { FileType } from '~/types';

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
  console.log('file.extension', file.extension, getIsImg(file.extension));
  return getIsDecodable(file.content) || getIsImg(file.extension);
};

export { getFileExtension, getIsImg, getIsDecodable, getIsViewable };
