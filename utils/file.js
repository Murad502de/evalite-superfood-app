export const createUploadedFileUrl = (file = null) => {
  return file ? (window.URL || window.webkitURL).createObjectURL(file) : '';
};
