import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SSR-Editor header', () => {
  render(<App />);
  const linkElement = screen.getByText(/SSR-Editor/i);
  expect(linkElement).toBeInTheDocument();
});
