import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./home.css";
import { getImageUrl } from '../utils/imageHelper';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data.slice(0, 8)));
    api.get("/news").then((res) => setNews(res.data.slice(0, 5)));

    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("active"),
        );
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="reveal">HỢP NHẤT LAND</h1>
          <p className="reveal delay-1">
            Kiến tạo giá trị bền vững – Khẳng định đẳng cấp bất động sản
          </p>
          <Link to="/projects" className="hero-btn reveal delay-2">
            Khám phá dự án
          </Link>
        </div>
      </section>

      {/* GIÁ TRỊ CỐT LÕI */}
      <section className="section container reveal">
        <h2>VỀ CHÚNG TÔI</h2>
        <div className="core-grid">
          {[
            [
              "CHỮ TÂM",
              "Phụng sự Khách hàng toàn tâm toàn ý, Hợp Nhất Land luôn thẳng thắn, chân thành để đem đến những giá trị tốt nhất cho Khách hàng của mình",
            ],
            [
              "CHỮ TÍN",
              "Lấy chữ TÍN làm đầu, giao dịch cùng Bất Động Sản Hợp Nhất Land Khách hàng được đảm bảo các vấn đề: chất lượng, giá cả, thủ tục hỗ trợ trước và sau quá trình giao dịch một cách chỉn chu nhất",
            ],
            [
              "CHỮ TÀI",
              "Đội ngũ tại Hợp Nhất Land đều là những nhân TÀI, có đam mê, nhiệt huyết, kiến thức để trở thành những chuyên viên môi giới chuyên nghiệp hàng đầu Việt Nam.",
            ],
            [
              "CHỮ TẦM",
              "Mục đích cuối cùng của Hợp Nhất Land là khẳng định giá trị vượt trội của bản thân, của tập thể sao cho xứng TẦM là đơn vị phân phối bất động sản hàng đầu Việt Nam.",
            ],
          ].map((i, idx) => (
            <div key={idx} className="core-card">
              <h3>{i[0]}</h3>
              <p>{i[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LĨNH VỰC */}
      <section className="section bg-gray reveal">
        <div className="container">
          <h2>LĨNH VỰC HOẠT ĐỘNG</h2>
          <div className="service-grid">
            {[
              "Môi giới bất động sản",
              "Quảng cáo bất động sản",
              "Quản lý bất động sản",
              "Pháp lý nhà đất",
              "Cho thuê căn hộ",
              "Thẩm định giá",
            ].map((s, i) => (
              <div key={i} className="service-card">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DỰ ÁN */}
      <section className="section container reveal">
        <h2>DỰ ÁN TIÊU BIỂU</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p._id} className="project-card">
              {/* ĐÂY LÀ DÒNG QUAN TRỌNG ĐÃ SỬA */}
              <img src={getImageUrl(p.images?.[0])} alt={p.title} />
              <div className="project-overlay">
                <h3>{p.title}</h3>
                <Link to={`/projects/${p.slug}`}>Xem chi tiết →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* TIN TỨC */}
      <section className="section dark reveal">
        <div className="container">
          <h2>TIN TỨC & SỰ KIỆN</h2>
          <div className="news-grid">
            {news.map((n) => (
              <div key={n._id} className="news-card">
                <h3>{n.title}</h3>
                <Link to={`/news/${n.slug}`}>Đọc tiếp →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2>NHẬN THÔNG TIN DỰ ÁN</h2>
        <p>Toàn bộ bảng giá – chính sách – hồ sơ pháp lý chỉ trong 1 lần tải</p>
        <button className="cta-btn" onClick={() => setOpenPopup(true)}>
          Nhận thông tin ngay
        </button>
      </section>
      {openPopup && (
        <div className="popup-overlay" onClick={() => setOpenPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>NHẬN THÔNG TIN DỰ ÁN</h3>
            <p>Bảng giá – Chính sách – Pháp lý đầy đủ</p>

            <input placeholder="Họ và tên" />
            <input placeholder="Số điện thoại" />
            <input placeholder="Email" />

            <button>Gửi thông tin</button>
            <span className="close" onClick={() => setOpenPopup(false)}>
              ×
            </span>
          </div>
        </div>
      )}
    </div>
  );
}