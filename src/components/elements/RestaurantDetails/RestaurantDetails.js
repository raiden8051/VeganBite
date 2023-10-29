import React, { useContext, useEffect, useRef, useState } from "react";
import "./RestaurantDetails.css";
import iconVeg from "../../../assets/images/icon-veg.png";
import DataContext from "../../../Context/DataContext";
import { FecthData, isObjEmpty } from "../../utils/Utils";
import Navbar from "../../Navbar";
import FloatingCart from "../FloatingCart/FloatingCart";
function RestaurantDetails() {
  const dataContext = useContext(DataContext);
  const [currentRest, setCurrentRest] = useState({});
  const userId = localStorage?.getItem("userId");

  useEffect(() => {
    if (isObjEmpty(dataContext.currentRest)) {
      FecthData("http://localhost:3001/api/restaurants", "POST")
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
  }, []);

  const handleCartClick = (itemId) => {
    dataContext.setCartItem((prev) => [...prev, itemId]);
  };

  useEffect(() => {
    console.log(dataContext.cartItem);
    if (dataContext.cartItem.length > 0) updateCartItems();
  }, [dataContext.cartItem]);

  const updateCartItems = async () => {
    const response = await fetch("http://localhost:3001/api/updatecart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        cartItems: dataContext.cartItem,
        cartPrice: dataContext.totalPrice,
        restaurantId: dataContext?.currentRest?._id,
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong");

    if (data.success) {
      // console.log(data);
    }
  };

  const handleItemDelete = async (id) => {
    let cd = dataContext.cartItem;
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

  const [accordian, setActiveAccordain] = useState(-1);
  const toggleAccordian = (key) => {
    if (key === accordian) {
      setActiveAccordain(-1);
      return;
    }
    setActiveAccordain(key);
  };
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
                                    disabled={dataContext.cartItem.includes(
                                      currentRest?.menu[item][inneritem]["f_id"]
                                    )}
                                    onClick={() => {
                                      handleCartClick(
                                        currentRest?.menu[item][inneritem][
                                          "f_id"
                                        ]
                                      );
                                      dataContext.setTotalPrice(
                                        (prev) =>
                                          parseInt(prev) +
                                          parseInt(
                                            currentRest?.menu[item][inneritem][
                                              "price"
                                            ]
                                          )
                                      );
                                    }}
                                  >
                                    {dataContext.cartItem.includes(
                                      currentRest?.menu[item][inneritem]["f_id"]
                                    )
                                      ? "In plate"
                                      : "Add to plate"}
                                  </button>
                                </span>
                                {dataContext.cartItem.includes(
                                  currentRest?.menu[item][inneritem]["f_id"]
                                ) && (
                                  <button
                                    onClick={() => {
                                      handleItemDelete(
                                        currentRest?.menu[item][inneritem][
                                          "f_id"
                                        ]
                                      );
                                      dataContext?.setTotalPrice(
                                        (prev) =>
                                          parseInt(prev) -
                                          parseInt(
                                            currentRest?.menu[item][inneritem][
                                              "price"
                                            ]
                                          )
                                      );
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

      <FloatingCart />
    </>
  );
}

export default RestaurantDetails;
