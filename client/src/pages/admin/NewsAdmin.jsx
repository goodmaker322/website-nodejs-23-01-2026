import { useEffect, useState } from "react";
import api from "../../api/axios";
import { uploadImage } from "../../api/upload";

export default function NewsAdmin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
  });

  const load = async () => {
    const res = await api.get("/news");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await api.post("/news", form);
    setForm({ title: "", slug: "", content: "", thumbnail: "" });
    load();
  };

  const del = async (id) => {
    await api.delete(`/news/${id}`);
    load();
  };

  const upload = async (file) => {
    const url = await uploadImage(file);
    setForm({ ...form, thumbnail: url });
  };

  return (
    <>
      <h1>Quản lý Tin tức</h1>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <input type="file" onChange={(e) => upload(e.target.files[0])} />

      <button onClick={add}>Thêm</button>

      <hr />

      {list.map((n) => (
        <div key={n._id}>
          {n.title}
          <button onClick={() => del(n._id)}>Xóa</button>
        </div>
      ))}
    </>
  );
}
