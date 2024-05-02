import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/UniversityList.css'; 

const UniversityList = ({ universities, onDelete }) => {
  const initialSearchTerm = localStorage.getItem('searchTerm') || '';
  const initialSortBy = localStorage.getItem('sortBy') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortBy, setSortBy] = useState(initialSortBy);


  console.log("university list", universities)

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDelete = (name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

    if (confirmDelete) {
      onDelete(name);
    }
  };

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedUniversities = [...filteredUniversities];

  if (sortBy === 'asc') {
    sortedUniversities.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'desc') {
    sortedUniversities.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="container">
      <h2 data-testid="university-list-title">University List</h2>
      <div className="filter-sort">
        <input
          type="text"
          placeholder="Search by university name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={sortBy} onChange={handleSortByChange} className="sort-select">
          <option value="">Default</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      {sortedUniversities.length === 0 ? (
        <p>No universities found.</p>
      ) : (
        sortedUniversities.map((university, index) => (
          <div key={index} className="university-card">
            <h3>{university.name}</h3>
            <p>Country: {university.country}</p>
            {university.state_province && <p>State/Province: {university.state_province}</p>}
            <p>
              Website: <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a>
            </p>
            <button className="delete_button" onClick={() => handleDelete(university.name)}>Delete</button>

            <button className="link_button">
              <Link to={`/university/${encodeURIComponent(university.name)}`}>View Details</Link>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UniversityList;

