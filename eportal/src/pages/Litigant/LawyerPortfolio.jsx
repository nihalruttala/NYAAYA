import React, { useEffect, useState } from 'react';
import LawyerCard from './LawyerCard';
import './LawyerPortfolio.css';

const LawyerPortfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedAverageRating, setSelectedAverageRating] = useState(''); // Default rating
  const [selectedExperienceRange, setSelectedExperienceRange] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lawyers');
        const data = await response.json();
        setLawyers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLawyers();
  }, []);

  const fetchAverageRating = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/ratings/average/${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        return data.averageRating;
      } else {
        throw new Error('Failed to fetch average rating');
      }
    } catch (error) {
      console.error('Error fetching average rating:', error);
      return null;
    }
  };

  const filterLawyers = async () => {
    try {
      const filtered = await Promise.all(lawyers.map(async (lawyer) => {
        if (selectedFilter === 'averageRating' && selectedAverageRating !== '') {
          const averageRating = await fetchAverageRating(lawyer.email);
          return averageRating === parseInt(selectedAverageRating, 10);
        }
        if (selectedFilter === 'freeService') {
          return lawyer.nalsa === "yes"; // Change to use 'nalsa' property
        }
        if (selectedFilter === 'experience' && selectedExperienceRange !== '') {
          const [min, max] = selectedExperienceRange.split('-');
          return lawyer.experience >= parseInt(min, 10) && lawyer.experience <= parseInt(max, 10);
        }
        return true;
      }));

      const filteredLawyers = lawyers.filter((_, index) => filtered[index]);

      // Filter based on search query
      const searchFilteredLawyers = filteredLawyers.filter((lawyer) =>
        (lawyer.name && lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lawyer.lawyertype && lawyer.lawyertype.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lawyer.state && lawyer.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lawyer.experience && lawyer.experience.toString().includes(searchQuery.toString()))
      );

      setFilteredLawyers(searchFilteredLawyers);
    } catch (error) {
      console.error("Error filtering lawyers:", error);
      setFilteredLawyers([]);
    }
  };

  useEffect(() => {
    filterLawyers();
  }, [lawyers, selectedFilter, selectedAverageRating, selectedExperienceRange, searchQuery]);

  return (
    <div className="chooselawyer">
      <div className="lawyerCards">
        <div className="lawyer-portfolio">
          <input
            id="searchbar"
            type="search"
            placeholder="🔍 Searching for Advocates...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className='filter'>
            <select
              id="filter"
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                if (e.target.value !== 'experience') {
                  setSelectedAverageRating('');
                }
              }}
            >
              <option value="">--- Select Filter ---</option>
              <option value="averageRating">Average Rating</option>
              <option value="freeService">Free Service Lawyers</option>
              <option value="experience">Years of Experience</option>
            </select>

            {selectedFilter === 'averageRating' && (
              <select
                id="ratingFilter"
                value={selectedAverageRating}
                onChange={(e) => setSelectedAverageRating(e.target.value)}
              >
                <option value="">--- Select Rating ---</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            )}

            {selectedFilter === 'experience' && (
              <select
                id="experienceFilter"
                value={selectedExperienceRange}
                onChange={(e) => setSelectedExperienceRange(e.target.value)}
              >
                <option value="">--- Select Experience Range ---</option>
                <option value="0-5">0-5 Years</option>
                <option value="5-10">5-10 Years</option>
                <option value="10-15">10-15 Years</option>
                <option value="15-100">15+ Years</option>
              </select>
            )}
          </div>

          {filteredLawyers.map((lawyer, index) => (
            <LawyerCard key={index} {...lawyer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerPortfolio;