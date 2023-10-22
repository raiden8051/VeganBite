import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodSection from "../components/FoodSection";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
export default function Home() {
  const dataContext = useContext(DataContext);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/displayData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dataContext.setIsLoading(false);
      dataContext.setError([]);
      dataContext.setFoodData(data);
    } catch (err) {
      dataContext.setIsLoading(false);
      dataContext.setError(["Failed to load data. Check your connection"]);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="rootDiv" style={{ background: "#262626" }}>
      <div>
        <Navbar />
      </div>
      <div>
        <FoodSection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
