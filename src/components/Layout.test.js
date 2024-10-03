import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

test('renders nav link 1 text', () => {
    render(<MemoryRouter><Layout /></MemoryRouter>);
    const link = screen.getByText(/Hem/i);
    expect(link).toBeInTheDocument();
});

test('renders nav link 2 text', () => {
    render(<MemoryRouter><Layout /></MemoryRouter>);
    const link = screen.getByText(/Nytt dokument/i);
    expect(link).toBeInTheDocument();
});

