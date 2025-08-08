import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AmenitysContext } from "../context/AmenitysContext";
import AmenityFinder from "../apis/AmenityFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const AmenityDetailPage = () => {
  const { id } = useParams();
  const { selectedAmenity, setSelectedAmenity } = useContext(
    AmenitysContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AmenityFinder.get(`/${id}`);
        console.log(response);

        setSelectedAmenity(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="section">
      {selectedAmenity && (
        <>
          <h1 className="text-center display-1">
            {selectedAmenity.amenity.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedAmenity.amenity.average_rating} />
            <span className="text-warning ml-1">
              {selectedAmenity.amenity.count
                ? `(${selectedAmenity.amenity.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedAmenity.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default AmenityDetailPage;
