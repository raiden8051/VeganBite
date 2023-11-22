import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../Context/DataContext";
import { getCartInfo } from "../../utils/Utils";

function Cart() {
  const dataContext = useContext(DataContext);
  useEffect(() => {
    getCartInfo(dataContext);
    // fetchData;
  }, []);
  const [cartItemsArr, setCartItemsArr] = useState([]);
  const cartItems = dataContext.cart.cartItems;
  const restaurantID = dataContext.cart.restaurantId;
  const restaurants = dataContext.restaurants;

  const cartRestaurant = restaurants.filter(
    (restaurant) => restaurant._id === restaurantID
  );

  const menu = cartRestaurant[0]?.menu;

  let arr = [];
  useEffect(() => {
    showCartItems();
  }, []);
  const showCartItems = () => {
    Object.keys(menu).forEach((dish) => {
      Object.keys(menu[dish]).forEach((innerDish) => {
        if (cartItems.includes(innerDish)) {
          setCartItemsArr((prev) => [
            ...prev,
            { [innerDish]: menu[dish][innerDish] },
          ]);
        }
      });
    });
  };

  return <div className="cart-container">CART </div>;
}

export default Cart;
