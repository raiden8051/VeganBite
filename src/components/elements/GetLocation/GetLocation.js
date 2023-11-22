import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DataContext from "../../../Context/DataContext";
import { fetchData } from "../../utils/Utils";
import "./GetLocation.css";
import { geocode, RequestType } from "react-geocode";
import { Link } from "react-router-dom";
const GetLocation = () => {
  const dataContext = useContext(DataContext);
  const userId = localStorage?.getItem("userId");

  const mapStyles = {
    height: "80vh",
    width: "100%",
  };
  const [latitude, setLatitude] = useState(25.6185024);
  const [longitude, setLongitude] = useState(85.0726964);
  const [address, setAddress] = useState({
    state: "",
    city: "",
    pin: "",
    // ward: "",
    street: [],
  });

  const [currentPosition, setCurrentPosition] = useState({
    lat: 25.6185024,
    lng: 85.0726964,
  });
  useEffect(() => {
    getAddress();
  }, [dataContext.latitude]);
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      // Geolocation is available
      navigator.geolocation.watchPosition(
        function (position) {
          console.log("loc", position);
          setCurrentPosition((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          dataContext.setLatitude();
          dataContext.setLongitude();
          getAddress();
          // You can use latitude and longitude to do whatever you need with the user's location data
          console.log("type Latitude: " + typeof latitude);
          console.log("Longitude: " + longitude);
          console.log("latitude: " + latitude);
        },
        function (error) {
          // Handle errors, if any
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            default:
              console.log("An unknown error occurred.");
              break;
          }
        }
      );
    }

    const curPosition = {
      lat: latitude,
      lng: longitude,
    };
    setCurrentPosition({
      lat: latitude,
      lng: longitude,
    });
  };
  const onMarkerDragEnd = (e) => {
    // setLatitude(e.latLng.lat());
    // setLongitude(e.latLng.lng());
    setCurrentPosition((prev) => ({
      ...prev,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }));
    geocode("latlng", `${currentPosition.lat}, ${currentPosition.lng}`, {
      key: "AIzaSyCyr7UIQZYY3A13pwl7F-ixmC7y3aKfOkg",
      language: "en",
      region: "us",
    })
      .then((response) => {
        console.log("res", response.results[0].address_components);
        const arr = response.results[0].address_components;
        console.log("city-arr", arr);
        const country = arr.filter((address) =>
          address.types.includes("country")
        );
        const state = arr.filter((address) =>
          address.types.includes("administrative_area_level_1")
        );
        const city = arr.filter((address) =>
          address.types?.includes("administrative_area_level_3")
        );
        const pin = arr.filter((address) =>
          address.types.includes("postal_code")
        );
        // const ward = arr.filter((address) =>
        //   address.types.includes("neighborhood")
        // );
        const street = arr.filter(
          (address) =>
            address.types?.includes("sublocality_level_1") ||
            address.types?.includes("route") ||
            address.types?.includes("sublocality_level_2") ||
            address.types.includes("neighborhood")
        );
        const streetAddress = street.map((val, key) => {
          return val.long_name;
        });
        setAddress((prev) => ({
          ...prev,
          country: country[0]?.long_name,
          state: state[0]?.long_name,
          city: city[0]?.long_name,
          pin: pin[0]?.long_name,
          // ward: ward[0]?.long_name ? ward[0]?.long_name : "",
          street: streetAddress,
        }));
        dataContext.setCountry(country[0]?.long_name);
        dataContext.setState(state[0]?.long_name);
        dataContext.setCity(city[0]?.long_name);
        // dataContext.setWard(ward[0]?.long_name);
        dataContext.setPin(pin[0]?.long_name);
        dataContext.setStreet(streetAddress);

        console.log("city", typeof pin[0]?.long_name);
        console.log("city-add", address);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getAddress = () => {
    geocode("latlng", `${currentPosition.lat}, ${currentPosition.lng}`, {
      key: "AIzaSyCyr7UIQZYY3A13pwl7F-ixmC7y3aKfOkg",
      language: "en",
      region: "us",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    // if (localStorage.getItem("userId")) {
    //   let id = localStorage.getItem("userId");
    //   fetchData("http://localhost:3001/api/getaddress", "POST", { userId: id })
    //     .then((data) => {
    //       if (data.success) {
    //         dataContext.setCart((prev) => ({
    //           ...prev,
    //           restaurantId: data?.data?.restaurantId,
    //           cartItems: data?.data?.cartItems,
    //           cartPrice: data?.data?.cartPrice,
    //         }));
    //       }
    //     })
    //     .catch((err) => {
    //       // dataContext.setIsLoading(false);
    //       dataContext?.setError(["Failed to load data. Check your connection"]);
    //     });
    // }
  };
  const updateAdress = async () => {
    const response = await fetch("http://localhost:3001/api/updateaddress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        latitude: currentPosition.lat,
        longitude: currentPosition.lng,
        country: address.country,
        state: address.state,
        city: address.city,
        pin: address.pin,
        street: address.street,
        // ward: address.ward,
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong 5");

    if (data.success) {
      console.log({ data });
    }
  };
  // const getUserAddress = (dataContext) => {
  //   if (localStorage.getItem("userId")) {
  //     let id = localStorage.getItem("userId");

  //     fetchData("http://localhost:3001/api/getaddress", "POST", { userId: id })
  //       .then((data) => {
  //         if (data.success) {
  //           dataContext.setAddress((prev) => ({
  //             ...prev,
  //             country: data.data.country,
  //             state: data.data.state,
  //             city: data.data.city,
  //             pin: data.data.pin,
  //           }));
  //         }
  //       })
  //       .catch((err) => {
  //         // dataContext.setIsLoading(false);
  //         dataContext.setError(["Failed to load data. Check your connection"]);
  //       });
  //   }
  // };
  const onMapClick = (e) => {
    console.log("event", e);
    setCurrentPosition((prev) => ({
      ...prev,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }));
  };

  //zoom animation
  // function animateMapZoomTo(map, targetZoom) {
  //   var currentZoom = arguments[2] || map.getZoom();
  //   if (currentZoom != targetZoom) {
  //     google.maps.event.addListenerOnce(map, "zoom_changed", function (event) {
  //       animateMapZoomTo(
  //         map,
  //         targetZoom,
  //         currentZoom + (targetZoom > currentZoom ? 1 : -1)
  //       );
  //     });
  //     setTimeout(function () {
  //       map.setZoom(currentZoom);
  //     }, 80);
  //   }
  // }
  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyCyr7UIQZYY3A13pwl7F-ixmC7y3aKfOkg">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
          onClick={(e) => {
            onMapClick(e);
          }}
        >
          {latitude ? (
            <Marker
              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true}
            />
          ) : null}
        </GoogleMap>
      </LoadScript>
      <span
        className="material-symbols-outlined locate-icon"
        onClick={() => {
          getCurrentLocation();
        }}
      >
        my_location
      </span>
      {/* <span
        className="locate-icon"
        onClick={() => {
          // getAdd();
        }}
      >
        get address
      </span> */}
      <Link to="/" className="flex items-center">
        {/* <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" /> */}
        <span className="nav-address-wrapper">
          <button
            className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 select-location-btn"
            onClick={updateAdress}
          >
            Select Location
          </button>
          {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Choose location
          </span> */}
        </span>
      </Link>
    </div>
  );
};
export default GetLocation;
