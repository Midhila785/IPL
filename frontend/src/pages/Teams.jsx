import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Teams.css"; // Ensure this is linked to apply styles

const Team = () => {
  const [teams, setTeams] = useState([]);

  // IPL team logos
  const teamLogos = {
    "Chennai Super Kings": "https://images.seeklogo.com/logo-png/19/1/ipl-chennai-super-kings-logo-png_seeklogo-196613.png",
    "Mumbai Indians": "https://i.pinimg.com/736x/28/09/a8/2809a841bb08827603ccac5c6aee8b33.jpg",
    "Royal Challengers Bengaluru": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLdnD5UP22d8Zzzki9WxcxrF8xTjcoUQLuA&s",
    "Punjab Kings": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Punjab_Kings_Logo.svg/1200px-Punjab_Kings_Logo.svg.png",
    "Kolkata Knight Riders": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAmBueoPTytl1deFCCv_p6RI9EESouMefZA&s",
    "Sunrisers Hyderabad": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL8DRTUwSIyV2rwWI__tm4k1G59SvqzipVfg&s",
    "Gujarat Titans": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNsY256Eo3UudHkhXRw34jUhpI0MW05602A&s",
    "Delhi Capitals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT91CfuG_eqITfbRqrVfDT8LGgL5P_BScdkTA&s",
    "Lucknow Super Giants": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGX7qhEuLFQkIK0sOGwk4Ra0hrVZdFJfebA&s",
    "Rajasthan Royals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5qDq090CqT-Qd5zXgNkh4b1FlGq_isC80g&s",
  };

  useEffect(() => {
    // Fetch teams from backend
    axios
      .get("http://localhost:3001/api/teams") // Ensure backend is running on port 5000
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  return (
    <div className="team-container">
      <h2>IPL 2025 Teams</h2>
      <div className="ipl-teams-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="team-item">
              <img src={teamLogos[team.name]} alt={team.name} className="team-logo" />
              <h3>{team.name}</h3>
              <p>
                <strong>City:</strong> {team.city}
              </p>
            </div>
          ))
        ) : (
          <p>Loading teams...</p>
        )}
      </div>
    </div>
  );
};

export default Team;
