import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./project.css";

export default function Projects() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setList(res.data));
  }, []);

  return (
    <div className="projects">
      <h1 className="projects-title">Dự án nổi bật</h1>

      <div className="project-grid">
        {list.map((p, i) => (
          <div
            key={p._id}
            className="project-card"
            style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="thumb">
              <img src={p.images?.[0] || "/placeholder.jpg"} alt={p.title} />
            </div>

            <div className="info">
              <h3>{p.title}</h3>
              <p className="price">{p.price}</p>

              <Link to={`/projects/${p.slug}`} className="btn">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
