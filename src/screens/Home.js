import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodSection from "../components/FoodSection";

export default function Home() {
  return (
    <div className="h-screen" style={{ background: "grey" }}>
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
