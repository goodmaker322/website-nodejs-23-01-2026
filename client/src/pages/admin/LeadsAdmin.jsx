import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function LeadsAdmin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/contact").then((r) => setList(r.data));
  }, []);

  return (
    <>
      <h1>Leads khách hàng</h1>
      {list.map((l) => (
        <div key={l._id}>
          <b>{l.name}</b> | {l.phone} | {l.email}
          <p>{l.message}</p>
          <hr />
        </div>
      ))}
    </>
  );
}
