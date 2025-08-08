import React from "react";
import Header from "../components/Header";
import AddAmenity from "../components/AddAmenity";
import AmenityList from "../components/AmenityList";

const Home = () => {
  return (
    <div className="section">
      <Header />
      <AddAmenity />
      <AmenityList />
    </div>
  );
};

export default Home;
