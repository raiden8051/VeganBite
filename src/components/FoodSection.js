import React, { useEffect, useState } from "react";
import FoodCard from "./elements/FoodCard";

export default function FoodSection() {
  const [foodObj, setFoodobj] = useState([]);

  const loadData = async () => {
    if (foodObj.length === 0) {
      const response = await fetch("http://localhost:3001/api/displayData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFoodobj(await response.json());
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="mt-5 ml-10">
      <FoodCard foodObj={foodObj} />
    </div>
  );
}
