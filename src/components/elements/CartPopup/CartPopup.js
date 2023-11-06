import React, { useContext, useState } from "react";
import DataContext from "../../../Context/DataContext";
import { handleCartChange } from "../../utils/Utils";
import "./CartPopup.css";

function CartPopup({ setChangeRestaurant, id }) {
  const dataContext = useContext(DataContext);
  const [confirmRestaurantChange, setConfirmRestaurantChange] = useState(false);
  return (
    <div className="restaurant-change-popup p-5">
      <h3 className="title text-xl font-bold mb-2">Items already in cart</h3>
      <div className="detail text-lg mb-5">
        Your cart contains items from other restaurant. Would you like to reset
        your cart for adding items from this restaurant?
      </div>
      <span>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            setChangeRestaurant(false);
          }}
        >
          NO
        </button>
        <button
          className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            setChangeRestaurant(false);
            setConfirmRestaurantChange(true);
            handleCartChange(
              dataContext,
              confirmRestaurantChange,
              setChangeRestaurant
            );
          }}
        >
          YES
        </button>
      </span>
    </div>
  );
}

export default CartPopup;
