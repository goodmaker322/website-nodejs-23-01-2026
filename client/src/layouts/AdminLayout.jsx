import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./adminlayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">ADMIN PANEL</div>

        <nav className="admin-nav">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/news">News</NavLink>
          <NavLink to="/admin/leads">Leads</NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
