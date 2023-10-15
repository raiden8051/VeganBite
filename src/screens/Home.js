import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodSection from "../components/FoodSection";

export default function Home() {
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
