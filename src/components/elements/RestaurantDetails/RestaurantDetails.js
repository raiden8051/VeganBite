/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./RestaurantDetails.css";
import iconVeg from "../../../assets/images/icon-veg.png";
import DataContext from "../../../Context/DataContext";
import {
  fetchData,
  getCartInfo,
  handelDeleteCartItems,
  handleUpdateCartItems,
  isObjEmpty,
} from "../../utils/Utils";
import Navbar from "../../Navbar";
import FloatingCart from "../FloatingCart/FloatingCart";
import CartPopup from "../CartPopup/CartPopup";
function RestaurantDetails() {
  const dataContext = useContext(DataContext);
  const [currentRest, setCurrentRest] = useState({});
  const [changeRestaurant, setChangeRestaurant] = useState(false);
  useEffect(() => {
    if (isObjEmpty(dataContext.currentRest)) {
      fetchData("http://localhost:3001/api/restaurants", "POST")
        .then((data) => {
          dataContext.setIsLoading(false);
          dataContext.setError([]);
          dataContext.setRestaurants(data);
          let restId = localStorage.getItem("selectedRestaurantId");
          setCurrentRest(data.filter((value) => restId === value._id)[0]);
        })
        .catch((err) => {
          dataContext.setIsLoading(false);
          dataContext.setError(["Failed to load data. Check your connection"]);
        });
    } else {
      console.log(dataContext.currentRest);
      setCurrentRest(dataContext.currentRest);
    }

    getCartInfo(dataContext);
  }, []);
  useEffect(() => {});
  const handleCartClick = (item, price) => {
    console.log("sg-4", item);
    let cartItems = dataContext.cart.cartItems;
    let cartPrice = dataContext.cart.cartPrice;
    let obj1 = { name: item, quantity: 1 };
    cartItems = [...cartItems, obj1];
    // cartItems = [...cartItems, item];
    console.log("sg-5", cartItems);

    cartPrice += parseInt(price);
    handleUpdateCartItems(dataContext, cartItems, cartPrice, currentRest?._id);
  };

  const handleItemDelete = async (item) => {
    let cartItems = dataContext.cart.cartItems;
    let cartPrice = dataContext.cart.cartPrice;

    cartItems = cartItems.filter((value) => {
      return value !== item;
    });

    cartPrice -= parseInt(item.price);

    handelDeleteCartItems(dataContext, cartItems, cartPrice, currentRest._id);
  };

  const [accordian, setActiveAccordain] = useState(-1);
  const toggleAccordian = (key) => {
    if (key === accordian) {
      setActiveAccordain(-1);
      return;
    }
    setActiveAccordain(key);
  };
  let dishNames = [];
  dataContext.cart.cartItems.forEach((item) => {
    console.log("gk-11", item.name);
    dishNames.push(item.name);
  });
  return (
    <>
      <Navbar />
      {!isObjEmpty(currentRest) ? (
        <div className="px-32 py-10 restaurant-details-main-wrapper">
          <div className="restaurant-details-top">
            <div className="restaurant-details-name">
              <p className="text-4xl  restaurant-name">{currentRest?.name}</p>
              <p className="text-lg text-left restaurant-sub-detail restaurant-type">
                {currentRest?.cuisine}
              </p>
              <p className="text-lg text-left restaurant-sub-detail restaurant-addr">
                {currentRest?.address}
              </p>
            </div>
            <div className="restaurant-details-rating">
              <span className="rating-wrapper">
                <span className="material-symbols-outlined rating-icon">
                  grade
                </span>
                <p className="text-base restaurant-rating">
                  {currentRest?.rating}
                </p>
              </span>
              <p className="text-sm restaurant-rating-count">
                {currentRest?.rating_count}
              </p>
            </div>
          </div>
          <div className="accordian">
            {Object.keys(currentRest?.menu).map((item, key) => {
              return (
                <>
                  <div className="accordian-content-wrapper" key={key}>
                    <div
                      className="accordian-heading"
                      onClick={() => toggleAccordian(key)}
                    >
                      <h3 className={accordian === key ? "active" : ""}>
                        {item}
                      </h3>
                      <span>
                        {accordian === key ? (
                          <span className="verticle">
                            <span className="material-symbols-outlined">
                              arrow_drop_up
                            </span>
                          </span>
                        ) : (
                          <span className="verticle">
                            <span className="material-symbols-outlined">
                              arrow_drop_down
                            </span>
                          </span>
                        )}
                      </span>
                    </div>
                    <div>
                      <div
                        className={accordian === key ? "active" : "inactive"}
                      >
                        {Object.keys(currentRest?.menu[item]).map(
                          (inneritem, key) => {
                            return (
                              <div className="food-detail-wrapper" key={key}>
                                <div className="text-left">
                                  <span className="food-name">
                                    <p className="">{inneritem}</p>
                                    <img
                                      className="food-type-image"
                                      src={iconVeg}
                                      alt="img"
                                    />
                                  </span>
                                  <span className="rupee">
                                    {currentRest?.menu[item][inneritem]?.price}
                                  </span>
                                </div>
                                <span className="inner-food-img">
                                  <button
                                    className="text-green-500 accordian-add-button px-5 py-2"
                                    disabled={
                                      dishNames.includes(inneritem) &&
                                      dataContext.cart.restaurantId ===
                                        currentRest._id
                                    }
                                    onClick={() => {
                                      if (
                                        dataContext.cart.cartItems.length > 0 &&
                                        dataContext.cart.restaurantId !=
                                          currentRest._id
                                      ) {
                                        setChangeRestaurant(true);
                                      }
                                      // else {
                                      handleCartClick(
                                        inneritem,
                                        currentRest?.menu[item][inneritem]
                                          ?.price
                                      );
                                      // }
                                    }}
                                  >
                                    {dishNames.includes(inneritem) &&
                                    dataContext.cart.restaurantId ===
                                      currentRest._id
                                      ? "In plate"
                                      : "Add to plate"}
                                  </button>
                                </span>
                                {dishNames.includes(inneritem) &&
                                  dataContext.cart.restaurantId ===
                                    currentRest._id && (
                                    <button
                                      onClick={() => {
                                        handleItemDelete(inneritem);
                                      }}
                                      className="delete-cart-item-button"
                                    >
                                      <span className="material-symbols-outlined">
                                        delete
                                      </span>
                                    </button>
                                  )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        "Server Issue"
      )}
      {changeRestaurant && (
        <CartPopup
          changeRestaurant={changeRestaurant}
          setChangeRestaurant={setChangeRestaurant}
        />
      )}
      <FloatingCart />
    </>
  );
}

export default RestaurantDetails;
