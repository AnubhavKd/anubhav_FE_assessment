import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import UniversityList from './Components/UniversityList';
import UniversityDetail from './Components/UniversityDetail';

const Home = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates'
        );

        // Restructure the response data to match your expected format
        const formattedData = response.data.map(university => ({
          name: university.name,
          stateProvince: university['state-province'],
          domains: university.domains,
          web_pages: university.web_pages,
          country: university.country,
          alpha_two_code: university.alpha_two_code
        }));

        console.log("formattedData",formattedData)

        setUniversities(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleDeleteUniversity = (universityName) => {
    const updatedUniversities = universities.filter((uni) => uni.name !== universityName);
    setUniversities(updatedUniversities);
    // Update local storage
    localStorage.setItem('universities', JSON.stringify(updatedUniversities));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UniversityList universities={universities} onDelete={handleDeleteUniversity} />} />
          <Route path="/university/:name" element={<UniversityDetail universities={universities} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;




