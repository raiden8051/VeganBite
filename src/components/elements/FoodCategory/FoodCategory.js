/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import DataContext from "../../../Context/DataContext";
import Spinner from "../Spinner/Spinner";

export default function FoodCategory() {
  const dataContext = useContext(DataContext);

  const foodCategory = dataContext?.foodCategory;
  console.log(foodCategory);

  const handleAddToCart = (id) => {};

  const renderItems = (value, key) => {
    return (
      <div
        key={key}
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        {/* <a href="#">
          <img className="rounded-t-lg food-img" src={value.img} alt="" />
        </a> */}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value.CategoryName}
            </h5>
          </a>
          {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {value.description}
          </p> */}
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white cursor-pointer bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleAddToCart(value._id)}
          >
            Select
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
        </div>
      </div>
    );
  };

  return (
    <div className="food-display-div">
      {dataContext.isLoading && <Spinner />}
      {dataContext.error.length > 0 ? (
        <p className="text-red-400">{dataContext.error[0]}</p>
      ) : (
        foodCategory?.map((value, key) => {
          return renderItems(value, key);
        })
      )}
    </div>
  );
}
