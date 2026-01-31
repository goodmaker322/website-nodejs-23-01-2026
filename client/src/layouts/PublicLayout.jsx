import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./publiclayout.css";
import logo from "../assets/images/logo-hopnhat.png";

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get("/news").then((res) => setNews(res.data?.slice(0, 4) || []));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page dark">
      {/* ===== HEADER ===== */}
      <header className="header glass">
        <div className="logo">
          <img src={logo} alt="logo-hop-nhat-land" />
          Hợp Nhất Land
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Trang chủ
          </Link>
          <Link to="/about" onClick={closeMenu}>
            Chúng tôi là
          </Link>
          <Link to="/investor" onClick={closeMenu}>
            Chủ đầu tư
          </Link>
          <Link to="/projects" onClick={closeMenu}>
            Dự án
          </Link>
          <Link to="/villa" onClick={closeMenu}>
            Biệt thự
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Liên hệ
          </Link>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Không gian sống ven biển đẳng cấp</h1>
          <p>Kiến trúc Địa Trung Hải – Giá trị bền vững</p>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <main className="main">
        {/* ===== NEWS SIDEBAR ===== */}
        <aside className="news glow">
          <h3>📰 Tin tức</h3>

          {news.map((n) => (
            <Link key={n._id} to={`/news/${n.slug}`} className="news-item">
              <span className="dot" />
              <div>
                <p className="title">{n.title}</p>
                <small>
                  {new Date(n.createdAt).toLocaleDateString("vi-VN")}
                </small>
              </div>
            </Link>
          ))}
        </aside>

        {/* ===== PAGE CONTENT ===== */}
        <section className="content">
          <div className="text">
            <Outlet />
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        © Hợp Nhất Land – Không gian sống tinh hoa
      </footer>
    </div>
  );
}
