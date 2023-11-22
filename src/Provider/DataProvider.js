import { useState } from "react";
import DataContext from "../Context/DataContext";

const DataProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItem] = useState([]);
  const [currentRest, setCurrentRest] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState([]);
  const [pin, setPin] = useState("");
  const [cart, setCart] = useState({
    cartItems: [],
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
    cartItems,
    setCartItem,
    restaurants,
    setRestaurants,
    currentRest,
    setCurrentRest,
    totalPrice,
    setTotalPrice,
    cart,
    setCart,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    street,
    setStreet,
    pin,
    setPin,
  };

  return (
    <DataContext.Provider value={dataProviderValues}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
