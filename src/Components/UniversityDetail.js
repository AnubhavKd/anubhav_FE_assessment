import React from 'react';
import { useParams } from 'react-router-dom';
import './styles/UniversityDetail.css'; // Import CSS styles

const UniversityDetail = ({ universities }) => {
  const { name } = useParams();
  const university = universities?.find((uni) => uni?.name === decodeURIComponent(name));


  if (!university) {
    return (
      <div className="outer-layout">
        <div className="container">
          <p className="not-found-message">University not found</p>
        </div>
      </div>
    );
  }

  
  const { country, web_pages, alpha_two_code } = university;
 

  


  return (
    <div className="outer-layout">
      <div className="container">
        <h2 className="detail-title" data-testid="university-detail-name">{university.name}</h2>
        <div className="detail-item">
          <p className="detail-label">Country:</p>
          <p className="detail-value">{country}</p>
        </div>

        { university?.stateProvince && (
          <div className="detail-item">
          <p className="detail-label">State/Province:</p>
          <p className="detail-value">{university?.stateProvince}</p>
        </div>
          
        )}
       
          
       
        <div className="detail-item">
          <p className="detail-label">Website:</p>
          <a
            className="detail-value website-link"
            href={web_pages[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {web_pages[0]}
          </a>
        </div>
        <div className="detail-item">
          <p className="detail-label">Alpha Two Code:</p>
          <p className="detail-value">{alpha_two_code}</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
