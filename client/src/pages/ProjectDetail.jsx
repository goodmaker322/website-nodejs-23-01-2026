import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./project-detail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`/projects/${slug}`).then((res) => setProject(res.data));
  }, [slug]);

  if (!project) return null;

  return (
    <div className="project-detail">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      {/* Header */}
      <header className="project-header">
        <h1>{project.title}</h1>
        <p className="price">{project.price}</p>
      </header>

      {/* Info */}
      <section className="project-info">
        <div>
          <span>Chủ đầu tư</span>
          <strong>{project.investor}</strong>
        </div>
        <div>
          <span>Pháp lý</span>
          <strong>{project.legal}</strong>
        </div>
      </section>

      {/* Description */}
      <section className="project-desc">{project.description}</section>

      {/* Gallery */}
      <section className="project-gallery">
        {project.images?.map((img, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{ animationDelay: `${i * 0.1}s` }}>
            <img src={img} alt={`${project.title} ${i + 1}`} />
          </div>
        ))}
      </section>
    </div>
  );
}
