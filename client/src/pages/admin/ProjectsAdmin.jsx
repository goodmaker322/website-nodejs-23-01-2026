import { useEffect, useState } from "react";
import api from "../../api/axios";
import { uploadImage } from "../../api/upload";

const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const EMPTY_FORM = {
  title: "",
  slug: "",
  investor: "",
  price: "",
  legal: "",
  status: "dang-trien-khai",
  description: "",
  images: [],
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  /* ================= LOAD ================= */
  const load = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UPLOAD ================= */
  const uploadImages = async (files) => {
    setLoading(true);
    for (const file of files) {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, images: [...f.images, url] }));
    }
    setLoading(false);
  };

  /* ================= CRUD ================= */
  const create = async () => {
    if (!form.title || !form.slug) return alert("Bắt buộc: Tiêu đề & Slug");

    await api.post("/projects", form);
    resetForm();
    load();
  };

  const update = async () => {
    await api.put(`/projects/${editingId}`, form);
    resetForm();
    load();
  };

  const edit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      slug: p.slug,
      investor: p.investor || "",
      price: p.price || "",
      legal: p.legal || "",
      status: p.status || "dang-trien-khai",
      description: p.description || "",
      images: p.images || [],
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Xác nhận xoá dự án?")) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  const removeImage = (img) => {
    setForm({
      ...form,
      images: form.images.filter((i) => i !== img),
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  /* ================= UI ================= */
  return (
    <>
      <h1>Khởi tạo / Quản lý dự án</h1>

      {/* ====== THÔNG TIN CƠ BẢN ====== */}
      <h3>1. Thông tin cơ bản</h3>
      <input
        placeholder="Tên dự án"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
            slug: toSlug(e.target.value),
          })
        }
      />

      <input
        placeholder="Slug (SEO URL)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <input
        placeholder="Chủ đầu tư"
        value={form.investor}
        onChange={(e) => setForm({ ...form, investor: e.target.value })}
      />

      {/* ====== THÔNG TIN BÁN HÀNG ====== */}
      <h3>2. Thông tin bán hàng</h3>
      <input
        placeholder="Giá bán (VD: 50 triệu/m²)"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Pháp lý (VD: Sổ hồng lâu dài)"
        value={form.legal}
        onChange={(e) => setForm({ ...form, legal: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="dang-trien-khai">Đang triển khai</option>
        <option value="sap-ra-mat">Sắp ra mắt</option>
        <option value="da-hoan-thanh">Đã hoàn thành</option>
      </select>

      {/* ====== MÔ TẢ ====== */}
      <h3>3. Mô tả dự án</h3>
      <textarea
        rows={5}
        placeholder="Mô tả chi tiết dự án"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* ====== HÌNH ẢNH ====== */}
      <h3>4. Hình ảnh dự án</h3>
      <input
        type="file"
        multiple
        onChange={(e) => uploadImages(e.target.files)}
      />
      {loading && <p>Đang upload ảnh...</p>}

      <div
        style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
        {form.images.map((img, i) => (
          <div key={i}>
            <img src={`http://localhost:5000${img}`} width={120} alt="" />
            <button onClick={() => removeImage(img)}>Xoá</button>
          </div>
        ))}
      </div>

      {/* ====== ACTION ====== */}
      <div style={{ marginTop: 20 }}>
        {editingId ? (
          <>
            <button onClick={update}>Cập nhật dự án</button>
            <button onClick={resetForm}>Huỷ</button>
          </>
        ) : (
          <button onClick={create}>Tạo dự án mới</button>
        )}
      </div>

      <hr />

      {/* ====== DANH SÁCH ====== */}
      <h2>Danh sách dự án</h2>
      {projects.map((p) => (
        <div key={p._id} style={{ marginBottom: 8 }}>
          <b>{p.title}</b> — {p.status}
          <button onClick={() => edit(p)}>Sửa</button>
          <button onClick={() => remove(p._id)}>Xoá</button>
        </div>
      ))}
    </>
  );
}
