// File: client/src/api/upload.js
import api from "./axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url; // Trả về URL ảnh
};

export const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post("/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.urls; // Trả về mảng URL
};
