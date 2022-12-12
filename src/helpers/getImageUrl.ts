export const getImageURL = (image: any) => {
  return "https:" + image.fields.file.url;
};
