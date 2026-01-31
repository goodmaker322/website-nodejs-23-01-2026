import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [s, setS] = useState({});

  useEffect(() => {
    api.get("/analytics/stats").then((r) => setS(r.data));
  }, []);

  const data = {
    labels: ["7 ngày", "Tháng", "Năm"],
    datasets: [
      {
        label: "Lượt truy cập",
        data: [s.last7Days, s.thisMonth, s.thisYear],
      },
    ],
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Bar data={data} />
    </>
  );
}
