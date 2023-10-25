import React from "react";
import FoodCard from "../elements/FoodCard/FoodCard";
import FoodCategory from "../elements/FoodCategory/FoodCategory";
import "./FoodSection.css";
import Restaurants from "../elements/Restaurants/Restaurants";

export default function FoodSection() {
  return (
    <div className="mt-5 ml-10">
      <div className="food-section-container">
        <h3 className="info-heading">Top restaurants chain in Patna</h3>
        <Restaurants />

        {/* <h3 className="info-heading">Or select food</h3> */}
        {/* <FoodCard /> */}
      </div>
    </div>
  );
}
