import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Venues.css"; // Ensure this file exists and is correctly linked

const Venue = () => {
  const [venues, setVenues] = useState([]);

  // Updated venue images with correct URLs
  const venueImages = {
    "Eden Gardens": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxQIa8EKave_yk7Ud-hU8fgN0JW1h-iNPjA&s",
    "Rajiv Gandhi International Stadium": "https://static.toiimg.com/photo/103995162.cms",
    "MA Chidambaram Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmcdbsb-uiPREzitucVeFz6z8wkG02dVOUQ&s",
    "Dr YS Rajasekhara Reddy ACA-VDCA Cricket Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5F1AYnnnHZccOiHMLPvK_mDPXOkLmMlYvcg&s",
    "Narendra Modi Stadium": "https://dxn76xj9mnmqa.cloudfront.net/stadium_images/dr.-y.s.-rajasekhara-reddy-aca-vdca-cricket-stadium-visakhapatnam-records-stats-a.jpg",
    "Barsapara Cricket Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydfMQ-hoJkPBSWeiQMcnSYNg6XOGvEpxLRw&s",
    "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAkjCeT75zuD9niWNaBZHZ_M6N0F5GGjyBw&s",
    "Wankhede Stadium": "https://yatrirailways.com/bl-content/uploads/pages/a7ff566bf018114cf3442efd888acc68/1_croped.jpeg",
    "New PCA Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQDkXYNErknVq5sTufTO4Jv_WsiytHVu1j9Q&s",
    "M Chinnaswamy Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0TwDFooZHFr5z8OYMxv0Hoq3QaFbqPqa8Q&s",
    "Sawai Mansingh Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSAICTk8ak0qdTKx8Sb-cGa_IXGyOpr3SdQ&s",
    "Arun Jaitley Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLrKT1H2gDu2PyARnmiBkJ6fdRUO4aHLQqw&s",
    "Himachal Pradesh Cricket Association Stadium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6kMl6mausfsCI8jU7JjCuBDbRHTKQZUTOA&s",
  };

  useEffect(() => {
    // Fetch venues from backend
    axios
      .get("http://localhost:3001/api/venues") // Ensure backend is running
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }, []);

  return (
    <div className="venue-container">
      <h2>IPL 2025 Venues</h2>
      <div className="ipl-venues-list">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue._id} className="venue-item">
              <img
                src={venueImages[venue.name] || "https://via.placeholder.com/300"}
                alt={venue.name}
                className="venue-image"
              />
              <h3>{venue.name}</h3>
              <p>
                <strong>Location:</strong> {venue.city}
              </p>
            </div>
          ))
        ) : (
          <p>Loading venues...</p>
        )}
      </div>
    </div>
  );
};

export default Venue;
