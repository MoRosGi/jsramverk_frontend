import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Document from '../Document.js';

test('renders button text', () => {
    render(<MemoryRouter><Document /></MemoryRouter>);
    const button = screen.getByText(/Redigera/i);
    expect(button).toBeInTheDocument();
});

