import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import UniversityList from './UniversityList';

describe('UniversityList Component', () => {
  const universities = [
    {
      name: 'Harvard University',
      country: 'USA',
      state_province: 'Massachusetts',
      web_pages: ['http://www.harvard.edu']
    },
    {
      name: 'Oxford University',
      country: 'UK',
      web_pages: ['http://www.ox.ac.uk']
    }
  ];

  const onDelete = jest.fn(); // Mock delete function

  it('renders university list component with title', () => {
    render(
      <Router>
        <UniversityList universities={universities} onDelete={onDelete} />
      </Router>
    );

    const titleElement = screen.getByTestId('university-list-title');
   

    
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('University List');
  });


  it('renders university list component with list of universities', () => {
    render(
      <Router>
        <UniversityList universities={universities} onDelete={onDelete} />
      </Router>
    );

    const getByRole=screen.getByRole('textbox')
    expect (getByRole).toBeInTheDocument()


  })

  it('renders sorting alphabetical order of list', () => {
    render(
      <Router>
        <UniversityList universities={universities} onDelete={onDelete} />
      </Router>
    );
    const getSortingFilter=screen.getByRole('combobox')
    expect (getSortingFilter).toBeInTheDocument()
  })


  it('testing correct title of university list', () => {
    render(
      <Router>
        <UniversityList universities={universities} onDelete={onDelete} />
      </Router>
    );
    const title=screen.getByRole('heading', {
        name: /university list/i
      })
    expect (title).toBeInTheDocument()
    
  })


  it('renders UniversityList component correctly', () => {
    const { asFragment } = render(
      <Router>
        <UniversityList universities={universities} onDelete={onDelete} />
      </Router>
    );

    // Use asFragment() to retrieve the component's rendered output as a snapshot
    expect(asFragment()).toMatchSnapshot();
  });


 




 

});
