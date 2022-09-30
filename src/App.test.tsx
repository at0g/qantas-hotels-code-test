import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Qantas logo', async () => {
  render(<App />);
  const logo = await screen.findByAltText('Qantas');
  expect(logo).toBeInTheDocument();
});
