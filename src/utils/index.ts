import { decode } from 'js-base64';
import JSZip from 'jszip';
import { v4 as uuid } from 'uuid';
import { FileType, FolderType, readFileType } from '~/types';

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

const uploadZipFile = async (zipFile: File): Promise<FolderType> => {
  const rootFolder: FolderType = {
    name: '/',
    displayName: '/',
    id: uuid(),
    isCollapsed: true,
    childFiles: [],
    childFolders: [],
    depth: 0,
  };

  const loadedZip: JSZip = await JSZip.loadAsync(zipFile);
  for (const [key, value] of Object.entries(loadedZip.files)) {
    const targetFolderName: string = parseParentFolderName(
      value.name,
      value.dir
    );

    const targetFolder = findTargetFolder(rootFolder, targetFolderName);

    if (targetFolder) {
      const displayName = parseDisplayName(value.name, value.dir);
      const depth = getDepth(value.name, value.dir);
      if (value.dir) {
        targetFolder.childFolders.push({
          name: value.name,
          displayName,
          id: uuid(),
          childFiles: [],
          childFolders: [],
          isCollapsed: true,
          depth,
        });
      } else {
        const content = await value.async('base64');
        targetFolder.childFiles.push({
          displayName,
          name: value.name,
          id: uuid(),
          content,
          extension: getFileExtension(value.name),
          depth,
        });
      }
    }
  }

  return rootFolder;
};

const findTargetFolder = (
  rootFolder: FolderType,
  folderName: string
): FolderType | undefined => {
  if (!isFolderName(folderName))
    throw new Error('Input arg folderName is not correct');

  if (folderName === '/') return rootFolder;

  const paths: string[] = folderName.split('/');
  paths.pop();

  let targetFolder: FolderType | undefined = rootFolder;
  while (paths.length > 0) {
    const path = paths.shift();
    if (!targetFolder) {
      return undefined;
    }
    targetFolder = targetFolder.childFolders.find(
      (childFolder) => childFolder.displayName === path
    );
  }

  return targetFolder;
};

const findTargetFile = (
  rootFolder: FolderType,
  fileName: string,
  fileId: string
): FileType | undefined => {
  const paths: string[] = fileName.split('/');

  let targetPosition = rootFolder;

  while (paths.length > 0) {
    const path = paths.shift();
    if (!targetPosition) {
      continue;
    }
    if (paths.length < 1) {
      return targetPosition.childFiles.find((file) => file.id === fileId);
    }
    targetPosition = targetPosition.childFolders.find(
      (childFolder) => childFolder.displayName === path
    )!;
  }

  return undefined;
};

const isFolderName = (folderName: string): boolean => {
  return /\/$/.test(folderName);
};

const parseParentFolderName = (targetName: string, isDir: boolean): string => {
  const splitedName = targetName.split('/');
  if (isDir) {
    if (!isFolderName(targetName))
      throw new Error('Input arg folderName is not correct');
    splitedName.pop();
    splitedName.pop();
  } else {
    splitedName.pop();
  }
  return splitedName.join('/') + '/';
};

const parseDisplayName = (targetName: string, isDir: boolean): string => {
  const splitedName = targetName.split('/');
  if (isDir) {
    if (!isFolderName(targetName))
      throw new Error('Input arg folderName is not correct');
    splitedName.pop();
    return splitedName.pop()!;
  }
  return splitedName.pop()!;
};

const getDepth = (fileName: string, isDir: boolean): number => {
  return isDir ? fileName.split('/').length - 1 : fileName.split('/').length;
};

const readFilesRecursive = (rootFolder: FolderType): readFileType[] => {
  const res: readFileType[] = [];
  rootFolder.childFiles.map((file) =>
    res.push({ name: file.name, content: file.content })
  );
  rootFolder.childFolders.forEach((folder) => {
    readFilesRecursive(folder).forEach((f) => res.push(f));
  });

  return res;
};

export {
  getFileExtension,
  getIsImg,
  getIsDecodable,
  getIsViewable,
  uploadZipFile,
  findTargetFolder,
  findTargetFile,
  readFilesRecursive,
};
