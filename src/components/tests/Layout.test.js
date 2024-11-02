import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout.js';

test('renders nav link 1 text', () => {
    render(<MemoryRouter><Layout /></MemoryRouter>);
    const link = screen.getByText(/Log in/i);
    expect(link).toBeInTheDocument();
});

test('renders nav link 2 text', () => {
    render(<MemoryRouter><Layout /></MemoryRouter>);
    const link = screen.getByText(/Register/i);
    expect(link).toBeInTheDocument();
});

