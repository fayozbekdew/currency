import React, { useState, useEffect, useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Home() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const { income, cost, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const cost = transactions
      .filter((t) => t.type === "cost")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const balance = income - cost;
    return { income, cost, balance };
  }, [transactions]);

  const doughnutData = {
    labels: ["Income", "Expencese", "Profit"],
    datasets: [
      {
        data: [income, cost, balance],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        hoverBackgroundColor: ["#66bb6a", "#e57373", "#64b5f6"],
      },
    ],
  };
  const categories = useMemo(() => {
    const costCategories = transactions
      .filter((t) => t.type === "cost")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        return acc;
      }, {});
    return Object.keys(costCategories).map((category) => ({
      category,
      amount: costCategories[category],
    }));
  }, [transactions]);

  const barChartData = {
    labels: ["Income", "Expencese"],
    datasets: [
      {
        label: "Jami",
        data: [income, cost],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const pieChartData = {
    labels: categories.map((item) => item.category),
    datasets: [
      {
        label: "Expense catogories",
        data: categories.map((item) => item.amount),
        backgroundColor: [
          "#ff9999",
          "#66b3ff",
          "#99ff99",
          "#ffcc99",
          "#ffb3e6",
        ],
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between">
        <span className="w-1/2 p-14 text-center">
          <h3 className="font-bold text-[20px] mb-2">Profit</h3>
          <Doughnut data={doughnutData} />
        </span>
        <span className="w-1 bg-slate-400"></span>
        <span className="w-1/2 p-14 text-center">
          <h3 className="font-bold text-[20px] mb-2">Expense Categories</h3>
          <Pie data={pieChartData} />
        </span>
      </div>
      <div>
        <h3>Income and Expencese</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
}

export default Home;
