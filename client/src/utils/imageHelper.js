// src/utils/imageHelper.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.jpg";

  // Nếu đã là full URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Nếu là đường dẫn tương đối
  if (imagePath.startsWith("/")) {
    return `${API_URL}${imagePath}`;
  }

  // Mặc định
  return `${API_URL}/uploads/${imagePath}`;
};
