import api from "./axios";

export const uploadImage = async (file) => {
  const form = new FormData();
  form.append("image", file);
  const res = await api.post("/upload", form);
  return res.data.url;
};
