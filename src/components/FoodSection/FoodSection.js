import React from "react";
import FoodCard from "../elements/FoodCard/FoodCard";
import FoodCategory from "../elements/FoodCategory/FoodCategory";
import "./FoodSection.css";
import Restaurants from "../elements/Restaurants/Restaurants";

export default function FoodSection() {
  return (
    <div className="mt-5 ml-10 mr-10">
      <div className="food-section-container">
        <h3 className="info-heading">Top restaurants chain in Patna</h3>
        <hr className="mt-10 mb-10 border-solid border-gray-500" />
        <Restaurants />
        <hr className="mt-10  border-solid border-gray-500" />

        <h3 className="info-heading mt-10 mb-10">Or select food</h3>
        <hr className="mb-10 border-solid border-gray-500" />
        <FoodCard />
      </div>
    </div>
  );
}
