import { useState } from "react";
import DataContext from "../Context/DataContext";

const DataProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

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
    currentMenu,
    setCurrentMenu,
  };

  return (
    <DataContext.Provider value={dataProviderValues}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
