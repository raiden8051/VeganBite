export const fetchData = async (url, method, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const isObjEmpty = (obj) => {
  return Object.keys(obj)?.length === 0;
};

export const getCartInfo = (dataContext) => {
  if (localStorage.getItem("userId")) {
    let id = localStorage.getItem("userId");

    fetchData("http://localhost:3001/api/getcart", "POST", { userId: id })
      .then((data) => {
        if (data.success) {
          dataContext.setCart((prev) => ({
            ...prev,
            restaurantId: data?.data?.restaurantId,
            cartItems: data?.data?.cartItems,
            cartPrice: data?.data?.cartPrice,
          }));
        }
      })
      .catch((err) => {
        // dataContext.setIsLoading(false);
        dataContext.setError(["Failed to load data. Check your connection"]);
      });
  }
};

export const handleCartChange = async (
  // _id,
  dataContext,
  changeRestaurant,
  confirmRestaurantChange
) => {
  // if (_id !== dataContext.cart.restaurantId) {
  // setChangeRestaurant(true);
  // let answer = window.confirm(
  //   "Changing restaurant will result in empty cart.\nClick Confirm if you want to change"
  // );
  if (confirmRestaurantChange) {
    const response = await fetch("http://localhost:3001/api/updatecart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...dataContext.cart,
        userId: localStorage.getItem("userId"),
        cartItems: [],
        cartPrice: 0,
        restaurantId: "",
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong");
    else {
      dataContext?.setCart((prev) => ({
        ...prev,
        userId: localStorage.getItem("userId"),
        cartItems: data?.data?.cartItems,
        cartPrice: data?.data?.cartPrice,
        restaurantId: data?.data?.restaurantId,
      }));
    }
  } else return;
  // }
};

export const handleUpdateCartItems = async (
  dataContext,
  cartItems,
  cartPrice,
  currRestId
) => {
  let userId = localStorage.getItem("userId");
  const response = await fetch("http://localhost:3001/api/updatecart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      cartItems: cartItems,
      cartPrice: cartPrice,
      restaurantId: currRestId,
    }),
  });
  const data = await response.json();

  if (!data.success) alert("Something went wrong");

  if (data.success) {
    dataContext.setCart((prev) => ({
      ...prev,
      restaurantId: data?.data?.restaurantId,
      cartItems: data?.data?.cartItems,
      cartPrice: data?.data?.cartPrice,
    }));
  }
};

export const handelDeleteCartItems = async (
  dataContext,
  cartItems,
  cartPrice,
  currRestId
) => {
  let userId = localStorage.getItem("userId");
  const response = await fetch("http://localhost:3001/api/updatecart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      cartItems: cartItems,
      cartPrice: cartPrice,
      restaurantId: currRestId,
    }),
  });
  const data = await response.json();

  if (!data.success) alert("Something went wrong");

  if (data.success) {
    dataContext.setCart((prev) => ({
      ...prev,
      restaurantId: data?.data?.restaurantId,
      cartItems: data?.data?.cartItems,
      cartPrice: data?.data?.cartPrice,
    }));
  }
};
