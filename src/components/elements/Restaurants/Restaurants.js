/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import DataContext from "../../../Context/DataContext";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import "./Restaurants.css";
import { handleCartChange } from "../../utils/Utils";

export default function Restaurants() {
  const dataContext = useContext(DataContext);
  const restaurants = dataContext?.restaurants;

  const renderItems = (value, key) => {
    return (
      <div
        key={key}
        className="max-w-sm bg-white  rounded-lg shadow dark:bg-transparent dark:border-gray-700"
      >
        <a href="#">
          <img className="rounded-t-lg food-img" src={value.img} alt="" />
        </a>
        <div className="px-5 py-5">
          <a href="#">
            <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value.name}
            </h5>
          </a>
          <div className="rest-rating-div">
            <span className="material-symbols-outlined">stars</span>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {value.rating}
            </p>
          </div>
          <p className="mb-1 text-left font-normal text-gray-700 dark:text-gray-400">
            {value.cuisine}
          </p>
          <p className="mb-3 text-left font-normal text-gray-700 dark:text-gray-400">
            <b>Address:</b> &nbsp;
            {value.address}
          </p>
          <Link
            to="/restaurants-details"
            className="inline-flex items-center w-full px-3 py-2 text-sm font-medium text-center bg-green-600 text-white cursor-pointer  rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              localStorage.setItem("selectedRestaurantId", value._id);
              dataContext.setCurrentRest(value);
              handleCartChange(value._id, dataContext);
            }}
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
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="food-display-div">
      <div className="food-cards">
        {dataContext.isLoading && <Spinner />}
        {dataContext.error.length > 0 ? (
          <p className="text-red-400">{dataContext.error[0]}</p>
        ) : (
          restaurants?.map((value, key) => {
            return renderItems(value, key);
          })
        )}
      </div>
    </div>
  );
}
