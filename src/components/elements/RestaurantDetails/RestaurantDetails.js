import React, { useContext, useEffect, useRef, useState } from "react";
import "./RestaurantDetails.css";
import iconVeg from "../../../assets/images/icon-veg.png";
import DataContext from "../../../Context/DataContext";
import { FecthData, isObjEmpty } from "../../utils/Utils";
function RestaurantDetails() {
  const dataContext = useContext(DataContext);
  const currentRest = dataContext?.currentRest;
  const [menu, setMenu] = useState({});

  console.log("gk-5", currentRest);
  useEffect(() => {
    if (isObjEmpty(dataContext.currentMenu)) {
      FecthData("http://localhost:3001/api/restaurants", "POST")
        .then((data) => {
          dataContext.setIsLoading(false);
          dataContext.setError([]);
          dataContext.setRestaurants(data);
          let restId = localStorage.getItem("selectedRestaurantId");
          setMenu(data.filter((value) => restId === value._id)[0].menu);
        })
        .catch((err) => {
          dataContext.setIsLoading(false);
          dataContext.setError(["Failed to load data. Check your connection"]);
        });
    } else {
      setMenu(dataContext.currentMenu);
    }
  }, []);

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
      <div className="px-32 py-10 restaurant-details-main-wrapper">
        <div className="restaurant-details-top">
          <div className="restaurant-details-name">
            <p className="text-4xl  restaurant-name">{currentRest.name}</p>
            <p className="text-lg text-left restaurant-sub-detail restaurant-type">
              {currentRest.cuisine}
            </p>
            <p className="text-lg text-left restaurant-sub-detail restaurant-addr">
              {currentRest.address}
            </p>
          </div>
          <div className="restaurant-details-rating">
            <span className="rating-wrapper">
              <span className="material-symbols-outlined rating-icon">
                grade
              </span>
              <p className="text-base restaurant-rating">
                {currentRest.rating}
              </p>
            </span>
            <p className="text-sm restaurant-rating-count">
              {currentRest.rating_count}
            </p>
          </div>
        </div>
        <div className="accordian">
          {Object.keys(menu).map((item, key) => {
            return (
              <>
                <div
                  className="accordian-content-wrapper"
                  key={key}
                  onClick={() => toggleAccordian(key)}
                >
                  <div className="accordian-heading">
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
                    <div className={accordian === key ? "active" : "inactive"}>
                      {Object.keys(menu[item]).map((inneritem, key) => {
                        return (
                          <div className="food-detail-wrapper" key={key}>
                            <div className="text-left">
                              {/* <div className="food-detail"> */}
                              <span className="food-name">
                                <p className="">{inneritem}</p>
                                <img
                                  className="food-type-image"
                                  src={iconVeg}
                                  alt="img"
                                />
                              </span>
                              <span className="rupee">
                                {menu[item][inneritem]?.price}
                              </span>
                            </div>
                            <span className="inner-food-img">
                              <img
                                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="food_img"
                              />
                              <button className="text-green-500 accordian-add-button">
                                Add
                              </button>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RestaurantDetails;
