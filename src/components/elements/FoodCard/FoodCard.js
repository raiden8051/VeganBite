/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import "./FoodCard.css";
import DataContext from "../../../Context/DataContext";
import Spinner from "../Spinner/Spinner";

export default function FoodCard({ foodObj }) {
  const dataContext = useContext(DataContext);
  const userId = localStorage?.getItem("userId");

  const foodData = dataContext?.foodData;
  const handleAddToCart = async (itemId) => {
    dataContext.setCartItem((prev) => [...prev, itemId]);
  };

  useEffect(() => {
    if (dataContext.cartItems.length > 0) updateCartItems();
  }, [dataContext.cartItems]);

  const updateCartItems = async () => {
    const response = await fetch("http://localhost:3001/api/updatecart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        cartItems: dataContext.cartItems,
        cartPrice: dataContext.totalPrice,
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong");

    if (data.success) {
      // console.log(data);
    }
  };

  const handleItemDelete = async (id) => {
    let cd = dataContext.cartItems;
    cd = cd.filter((value) => {
      return value !== id;
    });
    dataContext.setCartItem(cd);

    const response = await fetch("http://localhost:3001/api/updatecart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        cartItems: cd,
        cartPrice: dataContext.totalPrice,
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong");

    if (data.success) {
      // console.log(data);
    }
  };

  const renderItems = (value, key) => {
    return (
      <div
        key={key}
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img className="rounded-t-lg food-img" src={value.img} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {value.description}
          </p>
          <button
            disabled={dataContext.cartItems.includes(value._id)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white cursor-pointer bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              dataContext.setTotalPrice(
                (prev) => parseInt(prev) + parseInt(value?.options[0]?.full)
              );
              handleAddToCart(value._id);
            }}
          >
            {dataContext.cartItems.includes(value._id)
              ? "In plate"
              : "Add to plate"}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          {dataContext.cartItems.includes(value._id) && (
            <button
              onClick={() => {
                dataContext.setTotalPrice(
                  (prev) => parseInt(prev) - parseInt(value?.options[0]?.full)
                );
                handleItemDelete(value._id);
              }}
              className="delete-cart-item-button"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="food-cards">
      {dataContext.isLoading && <Spinner />}
      {dataContext.error.length > 0 ? (
        <p className="text-red-400">{dataContext.error[0]}</p>
      ) : (
        foodData?.map((value, key) => {
          return renderItems(value, key);
        })
      )}
    </div>
  );
}
