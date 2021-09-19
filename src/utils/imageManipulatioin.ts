import ImageResizer, { ResizeFormat } from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

export const reduceSingleImageSize = async (imageUri: string, type: string) => {
  const extension = type.substring(type.lastIndexOf('/') + 1, type.length);
  let format: ResizeFormat = 'JPEG';
  if (extension.toLowerCase() === 'png') format = 'PNG';
  else if (extension.toLowerCase() === 'webp') format = 'WEBP';

  const reducedImage = await ImageResizer.createResizedImage(
    imageUri,
    1080,
    1080,
    format,
    70,
  );
  const base64 = await RNFS.readFile(reducedImage.uri, 'base64');
  return { uri: `data:${type};base64,${base64}` };
};
