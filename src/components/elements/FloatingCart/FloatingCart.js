import React, { useContext } from "react";
import DataContext from "../../../Context/DataContext";
import "./FloatingCart.css";

function FloatingCart() {
  const dataContext = useContext(DataContext);
  const totalPrice = dataContext?.cart?.cartPrice;
  const cartItemsCount = dataContext?.cart?.cartItems.length;
  return (
    <div className="bg-blue-500 flex p-5 items-center justify-between text-white  floating-cart-wrapper">
      <span className="item-price-count-wrapper flex gap-0">
        <span className="p-1 pr-2 border-r">{cartItemsCount} items</span>
        <span className="p-1 pl-2">&#8377; {totalPrice}</span>{" "}
      </span>
      <button className="">
        <span className="material-symbols-outlined mx-2">
          shopping_cart_checkout
        </span>
      </button>
    </div>
  );
}

export default FloatingCart;
