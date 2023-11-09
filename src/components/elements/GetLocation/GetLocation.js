import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DataContext from "../../../Context/DataContext";
import { fetchData } from "../../utils/Utils";
import "./GetLocation.css";
import { geocode, RequestType } from "react-geocode";
const GetLocation = () => {
  const dataContext = useContext(DataContext);
  const userId = localStorage?.getItem("userId");

  const mapStyles = {
    height: "60vh",
    width: "100%",
  };
  const [latitude, setLatitude] = useState(25.6185024);
  const [longitude, setLongitude] = useState(85.0726964);

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
      console.log("loc", navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          dataContext.setLatitude();
          dataContext.setLongitude();
          // You can use latitude and longitude to do whatever you need with the user's location data
          console.log("type Latitude: " + typeof latitude);
          console.log("Longitude: " + longitude);
          console.log("position: " + position);
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
  console.log("gk-2", currentPosition);
  const onMarkerDragEnd = (e) => {
    // setLatitude(e.latLng.lat());
    // setLongitude(e.latLng.lng());
    setCurrentPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    // console.log("gk-1", currentPosition);
  };
  const getAddress = (dataContext) => {
    if (localStorage.getItem("userId")) {
      let id = localStorage.getItem("userId");

      fetchData("http://localhost:3001/api/getaddress", "POST", { userId: id })
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
          dataContext?.setError(["Failed to load data. Check your connection"]);
        });
    }
  };
  const updateAdress = async () => {
    const response = await fetch("http://localhost:3001/api/updateaddress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        latitude: latitude,
        longitude: longitude,
      }),
    });
    const data = await response.json();

    if (!data.success) alert("Something went wrong");

    if (data.success) {
      console.log({ data });
    }
    geocode("latlng", `${latitude}, ${longitude}`, {
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
  };

  const getAdd = () => {};
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCyr7UIQZYY3A13pwl7F-ixmC7y3aKfOkg">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
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
        class="material-symbols-outlined locate-icon"
        onClick={() => {
          getCurrentLocation();
        }}
      >
        my_location
      </span>
      <span
        class="locate-icon"
        onClick={() => {
          getAdd();
        }}
      >
        get address
      </span>
      <button
        className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={updateAdress}
      >
        Select Location
      </button>
    </>
  );
};
export default GetLocation;
