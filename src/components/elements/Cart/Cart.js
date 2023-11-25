import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../Context/DataContext";
import {
  getCartInfo,
  handelDeleteCartItems,
  handleUpdateCartItems,
} from "../../utils/Utils";
import "./Cart.css";
import iconVeg from "../../../assets/images/icon-veg.png";

function Cart() {
  const dataContext = useContext(DataContext);

  const [cartItemsArr, setCartItemsArr] = useState([]);
  const cartItems = dataContext.cart.cartItems;
  const restaurantID = dataContext.cart.restaurantId;
  const restaurants = dataContext.restaurants;
  const currentRest = dataContext.currentRest.name;
  const [totalPrice, setTotalPrice] = useState(0);
  const [toPayPrice, setToPayPrice] = useState(0);
  // console.log("guri-90", dataContext);
  const cartRestaurant = restaurants.filter(
    (restaurant) => restaurant._id === restaurantID
  );

  const menu = cartRestaurant[0]?.menu;
  // console.log("menu", menu);
  let arr = [];

  useEffect(() => {
    showCartItems();
    getCartInfo(dataContext);
    // calculateTotalPrice();
  }, []);

  let dishNames = [];
  dataContext.cart.cartItems.forEach((item) => {
    // console.log("gk-11", item.name);
    dishNames.push(item.name);
  });

  const showCartItems = () => {
    let countPrice = 0;
    Object.keys(menu).forEach((dish) => {
      Object.keys(menu[dish]).forEach((innerDish) => {
        // console.log("sss-5", innerDish);

        if (dishNames.includes(innerDish)) {
          // console.log("sss-4", menu[dish][innerDish]["price"]);
          countPrice += parseInt(menu[dish][innerDish]["price"]);
          setCartItemsArr((prev) => [
            ...prev,
            { [innerDish]: menu[dish][innerDish] },
          ]);
        }
      });
    });
    setTotalPrice(countPrice);
    setToPayPrice(countPrice + 30 + 3 + 60.77);
    // calculateTotalPrice();
  };

  // const calculateTotalPrice = () => {
  //   let count = 0;
  //   cartItemsArr.forEach((dish) => {
  //     console.log("sss-1", dish);
  //     Object.keys(dish).forEach((d) => {
  //       count += parseInt(dish[d]["price"]);
  //     });
  //   });
  //   setTotalPrice(count);
  //   console.log("sss-3", cartItemsArr);
  //   console.log("sss-2", count, totalPrice);
  //   setToPayPrice(totalPrice + 30 + 3 + 60.77);
  // };

  const handleDelete = (removedDish, price) => {
    console.log("gk-11", removedDish);
    let items = [];
    let cartPrice = dataContext.cart.cartPrice;
    let cartItems = dataContext.cart.cartItems;

    cartItems = cartItems.filter((dish) => dish.name !== removedDish);
    let tempCartItems = cartItemsArr.filter(
      (dish) => Object.keys(dish)[0] !== removedDish
      // console.log("gk-14", Object.keys(dish)[0])
    );
    setCartItemsArr(tempCartItems);

    cartPrice -= parseInt(price);
    console.log("gk-12", dataContext);
    console.log("gk-14", items);
    console.log("gk-13", tempCartItems);

    dataContext.setCart((prev) => ({
      ...prev,
      cartItems: [...cartItems],
    }));
    // handelDeleteCartItems(dataContext, cartItems, cartPrice, restaurantID);
  };
  // let totalPrice = 0;
  const address =
    dataContext.street +
    " " +
    dataContext.pin +
    ", " +
    dataContext.state +
    ", " +
    dataContext.city;
  // console.log("guri-5-cart", dataContext);
  // const toPay = totalPrice + 30 + 3 + 60.77;
  const handleAddItem = (currentDish) => {
    let quantity;
    let cartItems = dataContext.cart.cartItems;
    cartItems.forEach((item) => {
      if (item.name === currentDish) {
        item.quantity += 1;
      }
    });
    dataContext.setCart((prev) => ({
      ...prev,
      cartItems: [...cartItems],
    }));
    // let cartPrice = dataContext.cart.cartPrice + dataContext.cart.cartPrice;
    // handleUpdateCartItems(dataContext, cartItems, cartPrice, currentRest?._id);
  };
  const handleRemoveItem = (currentDish) => {
    let quantity;
    let cartItems = dataContext.cart.cartItems;

    cartItems.forEach((item) => {
      if (item.name === currentDish) {
        // if (item.quantity === 1) {
        //   handleDelete(currentDish);
        //   return;
        // }
        item.quantity -= 1;
      }
    });
    dataContext.setCart((prev) => ({
      ...prev,
      cartItems: [...cartItems],
    }));
  };
  return (
    <div className="cart-container ">
      <div className="cart-title font-semibold text-3xl py-4 pl-5 text-left">
        Cart
      </div>
      <div className="wrapper flex p-5 gap-5 container mx-auto mt-5">
        <div className="cart-address flex flex-col items-start basis-3/5 max-100 bg-white  shadow dark:bg-transparent dark:border-gray-700 p-5">
          <span className="address-icon-wrapper flex items-center justify-center">
            <span class="material-symbols-outlined text-white">
              location_on
            </span>
          </span>
          <h3 className="block address-title">Select delivery address</h3>
          <div className="address-wrapper flex border p-9 items-start gap-3">
            <span class="material-symbols-outlined address-locate-icon">
              location_on
            </span>
            <span className="flex flex-col">
              <span className="address-detail text-left">{address}</span>
              <button className="address-btn focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium text-sm px-4 py-2  mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                DELIVER HERE
              </button>
            </span>
          </div>
        </div>
        <div className="bg-white  basis-2/5">
          <p className="restaurant-name text-left p-8">{currentRest}</p>
          <hr></hr>
          {cartItemsArr.map((dish) => {
            // console.log("guri-2", dish);
            return Object.keys(dish).map((d, i) => {
              return (
                <div
                  key={i}
                  className="cart-card max-100 m-5 bg-white flex items-center px-5"
                >
                  <span className="flex gap-2">
                    <img className="food-type-image" src={iconVeg} alt="img" />

                    <span className="dish-name text-md">{d}</span>
                  </span>
                  <button
                    // onClick={() => {
                    //   handleDelete(d, dish[d]["price"]);
                    // }}
                    className="cart-item-button"
                  >
                    <span
                      onClick={() => {
                        if (
                          dataContext?.cart?.cartItems.filter(
                            (el) => el.name === d

                            // (el) => el.name === d
                          )[0]?.["quantity"] == 1
                        ) {
                          console.log("gk-3-1");
                          handleDelete(d, dish[d]["price"]);
                          return;
                        } else {
                          console.log("gk-3-2");

                          handleRemoveItem(d);
                        }
                      }}
                      className="material-symbols-outlined remove-icon text-sm text-light"
                    >
                      remove
                    </span>
                    <span className="">
                      {
                        dataContext?.cart?.cartItems.filter(
                          (el) => el.name === d
                        )[0]?.["quantity"]
                      }
                    </span>
                    <span
                      onClick={() => {
                        handleAddItem(d);
                      }}
                      className="material-symbols-outlined add-icon text-sm"
                    >
                      add
                    </span>
                  </button>
                  <span className="dish-price rupee">{dish[d]["price"]}</span>
                </div>
              );
            });
            // return <span>{Object.values(cartItems).map((item, key) => {})}</span>;
          })}
          <div className="p-5">
            <h2 className="text-left bill-details">Bill details</h2>
            <span className="sub-detail flex justify-between my-2">
              <span className="dish-price">Item Total</span>
              <span className="dish-price rupee">{totalPrice}</span>
            </span>
            <span className="sub-detail flex justify-between my-2 ">
              <span className="dish-price">Delivery Fee</span>
              <span className="dish-price rupee">30</span>
            </span>

            <hr></hr>
            <span className="sub-detail flex justify-between my-2">
              <span className="dish-price">Platform fee</span>
              <span className="dish-price rupee">3</span>
            </span>
            <span className="sub-detail flex justify-between my-2">
              <span className="dish-price">GST and Restaurant Charges</span>
              <span className="dish-price rupee">60.77</span>
            </span>
            <hr style={{ border: "1px solid black" }}></hr>
            <span className="sub-detail flex justify-between my-2">
              <span className="dish-price">TO PAY</span>
              <span className="dish-price rupee">{toPayPrice}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
