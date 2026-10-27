import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero and villain labels', () => {
  render(<App />);
  const heroLabel = screen.getByText(/Hero/i);
  const villainLabel = screen.getByText(/Villain/i);

  expect(heroLabel).toBeInTheDocument();
  expect(villainLabel).toBeInTheDocument();
});
