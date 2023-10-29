import { useState } from "react";
import DataContext from "../Context/DataContext";

const DataProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [currentRest, setCurrentRest] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState({
    cartItem: [],
    cartPrice: 0,
    restaurantId: "",
  });

  const dataProviderValues = {
    foodData,
    setFoodData,
    foodCategory,
    setFoodCategory,
    error,
    setError,
    isLoading,
    setIsLoading,
    cartItem,
    setCartItem,
    restaurants,
    setRestaurants,
    currentRest,
    setCurrentRest,
    totalPrice,
    setTotalPrice,
    cart,
    setCart,
  };

  return (
    <DataContext.Provider value={dataProviderValues}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
