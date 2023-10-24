import React, { useState } from "react";
import "./RestaurantDetails.css";
import iconVeg from "./icon-veg.png";
function RestaurantDetails(props) {
  const menu = props.menu;

  const [accordian, setActiveAccordain] = useState(-1);
  const toggleAccordian = (key) => {
    if (key === accordian) {
      setActiveAccordain(-1);
      return;
    }
    setActiveAccordain(key);
  };
  console.log("gk-2", menu);
  return (
    <>
      <div>
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
                        <>
                          <span className="verticle">-</span>
                        </>
                      ) : (
                        <>
                          <span className="verticle">+</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <p className={accordian === key ? "active" : "inactive"}>
                      {/* {menu[item]} */}
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
                                />
                              </span>
                              <span class="rupee">
                                {menu[item][inneritem]?.price}
                              </span>

                              {/* {console.log(
                                "gk-4",
                                // menu["Recommended"]["Chana Masala"].price,
                                // item,
                                "---",
                                // inneritem
                                menu[item][inneritem]?.price
                              )} */}
                            </div>
                            <span className="inner-food-img">
                              <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                              <button className="text-green-500 accordian-add-button">
                                Add
                              </button>
                            </span>
                          </div>
                        );
                      })}
                    </p>
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
