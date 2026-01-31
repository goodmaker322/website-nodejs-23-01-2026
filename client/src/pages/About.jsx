import { useEffect } from "react";
import "./about.css";

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about">
      {/* HERO */}
      <section className="about-hero reveal">
        <div className="container">
          <span className="badge">EST. 2019</span>
          <h1>HỢP NHẤT LAND</h1>
          <p>
            Doanh nghiệp phân phối, đầu tư và phát triển bất động sản chuyên
            nghiệp – uy tín – bền vững
          </p>
        </div>
      </section>

      {/* GIỚI THIỆU */}
      <section className="about-section reveal">
        <div className="container grid-2">
          <div>
            <h2>Về Hợp Nhất Land</h2>
            <p>
              Thành lập năm <b>2019</b>, Công Ty Cổ Phần Đầu Tư Bất Động Sản Hợp
              Nhất hoạt động trong lĩnh vực phân phối, đầu tư và phát triển bất
              động sản tại Việt Nam.
            </p>
            <p>
              Với hơn <b>10 năm kinh nghiệm</b> cùng sự dẫn dắt của
              <b> bà Nguyễn Thị Hồng Nhất – Tổng Giám Đốc</b>, Hợp Nhất Land
              từng bước khẳng định uy tín trên thị trường.
            </p>
          </div>

          <div className="core-box">
            <h3>Giá trị cốt lõi</h3>
            <ul>
              <li>Minh bạch & pháp lý rõ ràng</li>
              <li>Tư vấn chuyên sâu – trung thực</li>
              <li>Đồng hành dài hạn</li>
              <li>Phát triển bền vững</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TẦM NHÌN – SỨ MỆNH */}
      <section className="about-gray reveal">
        <div className="container grid-2">
          <div className="card red-border">
            <h3>Tầm nhìn</h3>
            <p>
              Trở thành <b>Top 5 doanh nghiệp bất động sản uy tín</b>
              tại Việt Nam vào năm 2030, hoạt động trên toàn quốc.
            </p>
          </div>

          <div className="card blue-border">
            <h3>Sứ mệnh</h3>
            <p className="quote">
              “Đem bất động sản giá trị thực đến cho khách hàng”
            </p>
          </div>
        </div>
      </section>

      {/* LĨNH VỰC */}
      <section className="about-section reveal">
        <div className="container">
          <h2>Lĩnh vực hoạt động</h2>

          <div className="grid-3">
            {[
              "Môi giới bất động sản",
              "Đào tạo chuyên viên",
              "Đầu tư bất động sản",
              "Phát triển dự án",
              "Phân phối bất động sản",
            ].map((item, i) => (
              <div key={i} className="service-card">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SƠ ĐỒ */}
      <section className="about-dark reveal">
        <div className="container center">
          <h2>Sơ đồ tổ chức công ty</h2>
          <p>Mô hình vận hành doanh nghiệp chuyên nghiệp</p>

          <img
            src="/images/so-do-to-chuc.png"
            alt="Sơ đồ tổ chức"
            className="org-img"
          />
        </div>
      </section>
    </div>
  );
}
