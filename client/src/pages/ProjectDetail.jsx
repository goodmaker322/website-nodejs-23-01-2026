import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getImageUrl } from '../utils/imageHelper';
import "./project-detail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${slug}`)
      .then((res) => {
        console.log("Project detail loaded:", res.data);
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading project:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin dự án...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="not-found">
        <h2>Không tìm thấy dự án</h2>
        <button onClick={() => navigate("/projects")} className="back-btn">
          ← Quay lại danh sách dự án
        </button>
      </div>
    );
  }

  // Format status
  const getStatusText = (status) => {
    switch (status) {
      case "dang-trien-khai": return "Đang triển khai";
      case "sap-ra-mat": return "Sắp ra mắt";
      case "da-hoan-thanh": return "Đã hoàn thành";
      default: return status;
    }
  };

  return (
    <div className="project-detail">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      {/* Header */}
      <header className="project-header">
        <h1>{project.title}</h1>
        <div className="header-meta">
          <span className="price">{project.price || "Liên hệ"}</span>
          <span className={`status ${project.status}`}>
            {getStatusText(project.status)}
          </span>
        </div>
      </header>

      {/* Info */}
      <section className="project-info">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Chủ đầu tư</span>
            <strong className="info-value">{project.investor || "Đang cập nhật"}</strong>
          </div>
          <div className="info-item">
            <span className="info-label">Pháp lý</span>
            <strong className="info-value">{project.legal || "Đang cập nhật"}</strong>
          </div>
          <div className="info-item">
            <span className="info-label">Trạng thái</span>
            <strong className="info-value">{getStatusText(project.status)}</strong>
          </div>
          <div className="info-item">
            <span className="info-label">Ngày cập nhật</span>
            <strong className="info-value">
              {new Date(project.updatedAt || project.createdAt).toLocaleDateString("vi-VN")}
            </strong>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="project-desc">
        <h2>Mô tả dự án</h2>
        <div className="desc-content" style={{ whiteSpace: "pre-line" }}>
          {project.description || "Đang cập nhật thông tin chi tiết..."}
        </div>
      </section>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="project-gallery">
          <h2>Hình ảnh dự án ({project.images.length})</h2>
          <div className="gallery-grid">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img 
                  src={getImageUrl(img)} 
                  alt={`${project.title} - Hình ${i + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    console.error("Failed to load image:", img);
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <div className="gallery-overlay">Xem ảnh {i + 1}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related projects or CTA */}
      <section className="project-cta">
        <h3>Quan tâm đến dự án này?</h3>
        <p>Liên hệ ngay để được tư vấn chi tiết và nhận bảng giá mới nhất</p>
        <button 
          className="contact-btn"
          onClick={() => navigate("/contact")}
        >
          Liên hệ tư vấn
        </button>
      </section>

      {/* Navigation */}
      <div className="project-navigation">
        <button className="nav-btn" onClick={() => navigate("/projects")}>
          ← Xem tất cả dự án
        </button>
      </div>
    </div>
  );
}