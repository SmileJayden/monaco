const getFileExtension = (fileName: string | undefined): string => {
  const res: string | undefined = fileName?.split('.').pop();
  return res ? res : '';
};

const getIsEditable = (fileExtension: string): boolean => {
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'ico':
      return false;
    default:
      return true;
  }
};

export { getFileExtension, getIsEditable };
