import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "./api/axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import NotFound from "./pages/NotFound";
import Investor from "./pages/Investor";
import Villa from "./pages/Villa";
function Track() {
  const { pathname } = useLocation();
  useEffect(() => {
    api.post("/analytics/track", { page: pathname });
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <Track />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/villa" element={<Villa />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/admin/news" element={<NewsAdmin />} />
          <Route path="/admin/leads" element={<LeadsAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
