import {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } from '../constants/cloudinary.js'
  import CryptoJS from 'crypto-js';

export function openUploadWidget(callback) {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget({
        cloudName: CLOUDINARY_NAME,
        uploadPreset: 'booking-images',
        sources: ['local', 'url'],
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: 'local'
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          callback(result.info.secure_url);
        }
      });
    } else {
      console.error("Cloudinary not initialized properly.");
    }
  };

  export async function upload(file, folder) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'booking-images');
    if (folder) {
        formData.append('folder', folder);
    }

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

export async function deleteImage(publicId) {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = CryptoJS.SHA1(stringToSign).toString();
  
  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('signature', signature);

  try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/destroy`, {
          method: 'POST',
          body: formData,
      });
      const data = await response.json();
      if (data.result === 'ok') {
          return true;
      } else {
          throw new Error('Delete failed');
      }
  } catch (error) {
      console.error('Delete error:', error);
      throw error;
  }
}