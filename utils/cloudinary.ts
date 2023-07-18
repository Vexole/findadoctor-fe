import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export const uploadImage = (files: FileList) => {
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('upload_preset', process.env.CLOUDINARY_PRESETS || 'find-a-family-doctor');
  return axios.post(
    process.env.CLOUDINARY_URL || 'https://api.cloudinary.com/v1_1/dbmmtklps/image/upload',
    formData
  );
};
