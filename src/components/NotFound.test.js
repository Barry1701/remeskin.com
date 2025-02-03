import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { MemoryRouter } from 'react-router-dom';

describe("NotFound Component", () => {
  test("renders not found message and image", () => {
    // Render the NotFound component within a MemoryRouter
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    // Check if the not found message is displayed
    expect(
      screen.getByText(/Sorry, the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
    
    // Check if an image is rendered (assuming NotFound renders an <img> element)
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
