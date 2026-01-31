import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function NewsDetail() {
  const { slug } = useParams();
  const [n, setN] = useState(null);

  useEffect(() => {
    api.get(`/news/${slug}`).then((res) => setN(res.data));
  }, [slug]);

  if (!n) return null;

  return (
    <>
      <h1>{n.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: n.content }} />
    </>
  );
}
