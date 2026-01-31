import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/contact", form);
    alert("Đã gửi");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Tên"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="SĐT"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Nội dung"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button>Gửi</button>
    </form>
  );
}
