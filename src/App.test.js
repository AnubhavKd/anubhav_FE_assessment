// Import necessary dependencies for testing
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe('App Component', () => {
  test('renders the App component without crashing', () => {
    render(<App />);
  });

  
});
