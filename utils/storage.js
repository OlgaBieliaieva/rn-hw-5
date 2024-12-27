import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config";

export const uploadImage = async (mainFolder, nestedFolder, file, fileName) => {
  try {
    const imageRef = ref(storage, `${mainFolder}/${nestedFolder}/${fileName}`);

    const result = await uploadBytes(imageRef, file);

    return imageRef;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};

export const removeImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error(`Error deleting image at path ${imagePath}:`, error);
    return false;
  }
};

export const replaceImage = async (imagePath, userId) => {
  try {
    const imageRef = ref(storage, imagePath);
    const imageBlob = await fetch(await getDownloadURL(imageRef)).then((res) =>
      res.blob()
    );
    if (imageBlob) {
      const userImagePath = `user_avatars/${userId}/avatar_${userId}_current`;
      const userImageRef = ref(storage, userImagePath);
      await uploadBytes(userImageRef, imageBlob);
      const newImageUrl = await getDownloadURL(userImageRef);

      await deleteObject(imageRef);

      return newImageUrl;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting image at path ${imagePath}:`, error);
    return false;
  }
};
