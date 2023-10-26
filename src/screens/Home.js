import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodSection from "../components/FoodSection/FoodSection";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import TempData from "../swiggyDataSet.json";
import { FecthData } from "../components/utils/Utils";
import FloatingCart from "../components/elements/FloatingCart/FloatingCart";
export default function Home() {
  const dataContext = useContext(DataContext);

  const loadData = async () => {
    // Uncomment this for running with local data
    // dataContext.setRestaurants(TempData);

    FecthData("http://localhost:3001/api/displaydata", "POST")
      .then((data) => {
        dataContext.setIsLoading(false);
        dataContext.setError([]);
        dataContext.setFoodData(data);
      })
      .catch((err) => {
        dataContext.setIsLoading(false);
        dataContext.setError(["Failed to load data. Check your connection"]);
      });

    FecthData("http://localhost:3001/api/restaurants", "POST")
      .then((data) => {
        dataContext.setIsLoading(false);
        dataContext.setError([]);
        dataContext.setRestaurants(data);
      })
      .catch((err) => {
        dataContext.setIsLoading(false);
        dataContext.setError(["Failed to load data. Check your connection"]);
      });

    // try {
    //   const response = await fetch(
    //     "http://localhost:3001/api/displaydatacategory",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await response.json();
    //   dataContext.setIsLoading(false);
    //   dataContext.setError([]);
    //   dataContext.setFoodCategory(data);
    // } catch (err) {
    //   dataContext.setIsLoading(false);
    //   dataContext.setError(["Failed to load data. Check your connection"]);
    // }

    if (localStorage.getItem("userId")) {
      let id = localStorage.getItem("userId");

      FecthData("http://localhost:3001/api/getcart", "POST", { userId: id })
        .then((data) => {
          if (data.success) {
            dataContext.setCartItem(data?.data?.cartItems);
            dataContext.setTotalPrice(parseInt(data?.data?.cartPrice));
          }
        })
        .catch((err) => {
          // dataContext.setIsLoading(false);
          dataContext.setError(["Failed to load data. Check your connection"]);
        });
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
      <div>{dataContext.cartItem.length > 0 && <FloatingCart />}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
