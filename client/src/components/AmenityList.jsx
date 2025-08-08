import React, { useEffect, useContext } from "react";
import AmenityFinder from "../apis/AmenityFinder";
import { AmenitysContext } from "../context/AmenitysContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const AmenityList = (props) => {
  const { amenitys, setAmenitys } = useContext(AmenitysContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AmenityFinder.get("/");
        console.log(response.data.data);
        setAmenitys(response.data.data.amenitys);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await AmenityFinder.delete(`/${id}`);
      setAmenitys(
        amenitys.filter((amenity) => {
          return amenity.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/amenitys/${id}/update`);
  };

  const handleAmenitySelect = (id) => {
    history.push(`/amenitys/${id}`);
  };

  const renderRating = (amenity) => {
    if (!amenity.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={amenity.id} />
        <span className="text-warning ml-1">({amenity.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Amenity</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {amenitys &&
            amenitys.map((amenity) => {
              return (
                <tr
                  onClick={() => handleAmenitySelect(amenity.id)}
                  key={amenity.id}
                >
                  <td>{amenity.name}</td>
                  <td>{amenity.location}</td>
                  <td>{"$".repeat(amenity.price_range)}</td>
                  <td>{renderRating(amenity)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, amenity.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, amenity.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {}
        </tbody>
      </table>
    </div>
  );
};

export default AmenityList;
