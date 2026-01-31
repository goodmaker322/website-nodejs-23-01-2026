import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function News() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/news").then((res) => setList(res.data));
  }, []);

  return (
    <>
      <h1>Tin tức</h1>
      {list.map((n) => (
        <div key={n._id}>
          <h3>{n.title}</h3>
          <Link to={`/news/${n.slug}`}>Đọc</Link>
        </div>
      ))}
    </>
  );
}
