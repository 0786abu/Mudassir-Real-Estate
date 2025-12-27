import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (buffer, folder = "profiles") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    ).end(buffer);
  });
};