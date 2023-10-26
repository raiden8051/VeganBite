import React, { useContext } from "react";
import DataContext from "../../../Context/DataContext";
import "./FloatingCart.css";

function FloatingCart() {
  const dataContext = useContext(DataContext);
  const totalPrice = dataContext?.totalPrice;
  const cartItemsCount = dataContext?.cartItem.length;
  return (
    <div className="bg-blue-500 flex p-5 items-center justify-between text-white  floating-cart-wrapper">
      <span className="item-price-count-wrapper flex gap-0">
        <span className="border-r p-1 pr-2">{totalPrice}</span>{" "}
        <span className="p-1 pl-2 ">{cartItemsCount}</span>
      </span>
      <button className="rounded-md h-10 bg-yellow-300 text-black p-2 ">
        View Cart
      </button>
    </div>
  );
}

export default FloatingCart;
