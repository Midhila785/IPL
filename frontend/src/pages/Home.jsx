import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import Slideshow from "../components/Slideshow"; // ✅ Import Slideshow
import "./Home.css"; // ✅ Import Home CSS for styles

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 3; // ✅ Number of matches per page

  useEffect(() => {
    fetch("http://localhost:3001/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const sortedMatches = data.sort((a, b) => a.matchNumber - b.matchNumber);
        setMatches(sortedMatches);
      })
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  // ✅ Calculate the matches to show on the current page
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  // ✅ Handle Pagination (Next/Prev Buttons)
  const nextPage = () => {
    if (indexOfLastMatch < matches.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-container">
      <Slideshow /> {/* ✅ Slideshow added */}
      
      <h2>Upcoming Matches</h2>

      {/* ✅ Horizontal Scrollable Match Container */}
      <div className="matches-container">
        {currentMatches.map((match) => (
          <MatchCard key={match._id} match={match} />
        ))}
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={indexOfLastMatch >= matches.length}>Next</button>
      </div>
    </div>
  );
};

export default Home;
