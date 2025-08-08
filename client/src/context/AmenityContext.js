import React, { useState, createContext } from "react";

export const AmenitysContext = createContext();

export const AmenitysContextProvider = (props) => {
  const [amenitys, setAmenitys] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const addAmenitys = (amenity) => {
    setAmenitys([...amenitys, amenity]);
  };
  return (
    <AmenitysContext.Provider
      value={{
        amenitys,
        setAmenitys,
        addAmenitys,
        selectedAmenity,
        setSelectedAmenity,
      }}
    >
      {props.children}
    </AmenitysContext.Provider>
  );
};
