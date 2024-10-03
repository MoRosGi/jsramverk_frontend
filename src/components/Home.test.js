import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('renders heading text', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const heading = screen.getByText(/Hem/i);
    expect(heading).toBeInTheDocument();
});

test('renders button text', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const button = screen.getByText(/Nytt dokument/i);
    expect(button).toBeInTheDocument();
});

